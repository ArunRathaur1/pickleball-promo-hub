import { Button } from '@/components/ui/button';

export default function FormActions({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <div className="flex justify-end mt-8">
      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md"
      >
        {isSubmitting ? 'Creating...' : 'Create Tournament'}
      </Button>
    </div>
  );
}