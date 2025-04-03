import re
import sys

def update_tsx_classes(html_file, output_file):
    """Convert class names in an HTML file to TypeScript (TSX) CSS Modules format."""
    with open(html_file, 'r', encoding='utf-8') as file:
        html_content = file.read()

    def replace_class_names(match):
        classes = match.group(1).split()
        updated_classes = []
        for cls in classes:
            if '-' in cls:
                updated_classes.append(f'styles["{cls}"]')  # Handle hyphenated class names
            else:
                updated_classes.append(f'styles.{cls}')
        
        if len(updated_classes) == 1:
            return f'className={{ {updated_classes[0]} }}'
        else:
            return f'className={{ `{ " ".join([f"${{{cls}}}" for cls in updated_classes]) }` }}'

    updated_tsx = re.sub(r'className="([^"]+)"', replace_class_names, html_content)

    with open(output_file, 'w', encoding='utf-8') as file:
        file.write(updated_tsx)

    print(f"Updated TSX saved to {output_file}")

# Example usage
if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python script.py input.html output.tsx")
    else:
        update_tsx_classes(sys.argv[1], sys.argv[2])
