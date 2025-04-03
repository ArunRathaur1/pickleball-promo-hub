import React, { useState, ChangeEvent, FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Info, Trash2, Plus, Award, Users, Instagram, Youtube } from "lucide-react";
import axios from "axios";

interface AthleteFormData {
  name: string;
  age: string;
  gender: string;
  country: string;
  height: string;
  points: string;
  DUPRID: string;
  sponsors: { name: string; imageUrl: string }[];
  instagramPage: string;
  titlesWon: { title: string; year: string }[];
  relatedContent: { imageUrl: string; title: string; youtubeLink: string }[];
  imageUrl: string;
}

export default function AddAthlete() {
  const [formData, setFormData] = useState<AthleteFormData>({
    name: "",
    age: "",
    gender: "",
    country: "",
    height: "",
    points: "0",
    DUPRID: "",
    sponsors: [{ name: "", imageUrl: "" }],
    instagramPage: "",
    titlesWon: [{ title: "", year: "" }],
    relatedContent: [{ imageUrl: "", title: "", youtubeLink: "" }],
    imageUrl: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitMessage, setSubmitMessage] = useState({ type: "", message: "" });
  
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.age) errors.age = "Age is required";
    if (!formData.gender) errors.gender = "Gender selection is required";
    if (!formData.country.trim()) errors.country = "Country is required";
    if (!formData.DUPRID.trim()) errors.DUPRID = "DUPRID is required";
    if (!formData.imageUrl.trim()) errors.imageUrl = "Athlete image URL is required";
    
    // Validate sponsors
    formData.sponsors.forEach((sponsor, idx) => {
      if (!sponsor.name.trim()) errors[`sponsor_${idx}_name`] = "Sponsor name is required";
      if (!sponsor.imageUrl.trim()) errors[`sponsor_${idx}_image`] = "Sponsor image URL is required";
    });
    
    // Validate titles
    formData.titlesWon.forEach((title, idx) => {
      if (!title.title.trim()) errors[`title_${idx}_name`] = "Title name is required";
      if (!title.year) errors[`title_${idx}_year`] = "Year is required";
    });
    
    // Validate related content
    formData.relatedContent.forEach((content, idx) => {
      if (!content.title.trim()) errors[`content_${idx}_title`] = "Content title is required";
      if (!content.youtubeLink.trim()) errors[`content_${idx}_link`] = "YouTube link is required";
    });
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors(prev => {
        const updated = {...prev};
        delete updated[name];
        return updated;
      });
    }
  };

  const handleNestedChange = (
    index: number,
    field: string,
    value: string,
    key: keyof Pick<AthleteFormData, "sponsors" | "titlesWon" | "relatedContent">
  ) => {
    const updatedArray = [...formData[key]];
    updatedArray[index][field] = value;
    setFormData((prev) => ({ ...prev, [key]: updatedArray }));
    
    // Clear error for this field if it exists
    const errorKey = `${key}_${index}_${field}`;
    if (formErrors[errorKey]) {
      setFormErrors(prev => {
        const updated = {...prev};
        delete updated[errorKey];
        return updated;
      });
    }
  };

  const addField = (key: keyof Pick<AthleteFormData, "sponsors" | "titlesWon" | "relatedContent">, newItem: any) => {
    setFormData((prev) => ({ ...prev, [key]: [...prev[key], newItem] }));
  };

  const removeField = (index: number, key: keyof Pick<AthleteFormData, "sponsors" | "titlesWon" | "relatedContent">) => {
    if (formData[key].length <= 1) {
      return; // Keep at least one item
    }
    const updatedArray = formData[key].filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [key]: updatedArray }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitMessage({ type: "error", message: "Please fix the errors in the form" });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitMessage({ type: "", message: "" });
    
    try {
      // Simulate API call with a delay (replace with your actual API call)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // /* Uncomment for actual API call
      await axios.post("http://localhost:5000/athletes", {
        ...formData,
        age: Number(formData.age),
        height: Number(formData.height),
        points: Number(formData.points),
        titlesWon: formData.titlesWon.map((t) => ({ title: t.title, year: Number(t.year) })),
      });
      // */
      
      setSubmitMessage({ type: "success", message: "Athlete added successfully!" });
      
      // Reset form data
      setFormData({
        name: "",
        age: "",
        gender: "",
        country: "",
        height: "",
        points: "0",
        DUPRID: "",
        sponsors: [{ name: "", imageUrl: "" }],
        instagramPage: "",
        titlesWon: [{ title: "", year: "" }],
        relatedContent: [{ imageUrl: "", title: "", youtubeLink: "" }],
        imageUrl: "",
      });
    } catch (error) {
      setSubmitMessage({ type: "error", message: "Failed to add athlete. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <Card>
        <CardHeader className="bg-blue-50">
          <CardTitle className="text-xl font-bold text-blue-800">Add New Athlete</CardTitle>
        </CardHeader>
        
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-700">
                <Info size={18} />
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Athlete's full name" 
                    className={`w-full p-2 border rounded-md ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">DUPRID</label>
                  <input 
                    type="text" 
                    name="DUPRID" 
                    value={formData.DUPRID} 
                    onChange={handleChange} 
                    placeholder="Athlete's ID" 
                    className={`w-full p-2 border rounded-md ${formErrors.DUPRID ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {formErrors.DUPRID && <p className="text-red-500 text-xs mt-1">{formErrors.DUPRID}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Age</label>
                  <input 
                    type="number" 
                    name="age" 
                    value={formData.age} 
                    onChange={handleChange} 
                    placeholder="Age" 
                    min="1"
                    className={`w-full p-2 border rounded-md ${formErrors.age ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {formErrors.age && <p className="text-red-500 text-xs mt-1">{formErrors.age}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Gender</label>
                  <select 
                    name="gender" 
                    value={formData.gender} 
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md ${formErrors.gender ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {formErrors.gender && <p className="text-red-500 text-xs mt-1">{formErrors.gender}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Country</label>
                  <input 
                    type="text" 
                    name="country" 
                    value={formData.country} 
                    onChange={handleChange} 
                    placeholder="Country" 
                    className={`w-full p-2 border rounded-md ${formErrors.country ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {formErrors.country && <p className="text-red-500 text-xs mt-1">{formErrors.country}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Height (cm)</label>
                  <input 
                    type="number" 
                    name="height" 
                    value={formData.height} 
                    onChange={handleChange} 
                    placeholder="Height in cm" 
                    min="0"
                    step="any"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Points</label>
                  <input 
                    type="number" 
                    name="points" 
                    value={formData.points} 
                    onChange={handleChange} 
                    placeholder="Points" 
                    min="0"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Instagram</label>
                  <div className="flex items-center">
                    <span className="bg-gray-100 p-2 rounded-l-md border border-r-0 border-gray-300">
                      <Instagram size={18} className="text-pink-500" />
                    </span>
                    <input 
                      type="text" 
                      name="instagramPage" 
                      value={formData.instagramPage} 
                      onChange={handleChange} 
                      placeholder="Instagram handle" 
                      className="w-full p-2 border border-gray-300 rounded-r-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Profile Image URL</label>
                  <input 
                    type="text" 
                    name="imageUrl" 
                    value={formData.imageUrl} 
                    onChange={handleChange} 
                    placeholder="Athlete's image URL" 
                    className={`w-full p-2 border rounded-md ${formErrors.imageUrl ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {formErrors.imageUrl && <p className="text-red-500 text-xs mt-1">{formErrors.imageUrl}</p>}
                </div>
              </div>
            </div>

            {/* Sponsors Section */}
            <div className="space-y-4 pt-2 border-t border-gray-200">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-700 pt-2">
                <Users size={18} />
                Sponsors
              </h3>
              
              {formData.sponsors.map((sponsor, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-sm">Sponsor #{index + 1}</h4>
                    <button 
                      type="button" 
                      onClick={() => removeField(index, "sponsors")}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Sponsor Name</label>
                      <input 
                        type="text" 
                        value={sponsor.name} 
                        onChange={(e) => handleNestedChange(index, "name", e.target.value, "sponsors")} 
                        placeholder="Sponsor name" 
                        className={`w-full p-2 border rounded-md ${formErrors[`sponsor_${index}_name`] ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {formErrors[`sponsor_${index}_name`] && <p className="text-red-500 text-xs mt-1">{formErrors[`sponsor_${index}_name`]}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Sponsor Logo URL</label>
                      <input 
                        type="text" 
                        value={sponsor.imageUrl} 
                        onChange={(e) => handleNestedChange(index, "imageUrl", e.target.value, "sponsors")} 
                        placeholder="Logo URL" 
                        className={`w-full p-2 border rounded-md ${formErrors[`sponsor_${index}_image`] ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {formErrors[`sponsor_${index}_image`] && <p className="text-red-500 text-xs mt-1">{formErrors[`sponsor_${index}_image`]}</p>}
                    </div>
                  </div>
                </div>
              ))}
              
              <button 
                type="button" 
                onClick={() => addField("sponsors", { name: "", imageUrl: "" })}
                className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 flex items-center justify-center gap-2 rounded-md border border-blue-200"
              >
                <Plus size={16} />
                Add Sponsor
              </button>
            </div>

            {/* Titles Won Section */}
            <div className="space-y-4 pt-2 border-t border-gray-200">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-700 pt-2">
                <Award size={18} />
                Titles Won
              </h3>
              
              {formData.titlesWon.map((title, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-sm">Title #{index + 1}</h4>
                    <button 
                      type="button" 
                      onClick={() => removeField(index, "titlesWon")}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Title Name</label>
                      <input 
                        type="text" 
                        value={title.title} 
                        onChange={(e) => handleNestedChange(index, "title", e.target.value, "titlesWon")} 
                        placeholder="Championship name" 
                        className={`w-full p-2 border rounded-md ${formErrors[`title_${index}_name`] ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {formErrors[`title_${index}_name`] && <p className="text-red-500 text-xs mt-1">{formErrors[`title_${index}_name`]}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Year</label>
                      <input 
                        type="number" 
                        value={title.year} 
                        onChange={(e) => handleNestedChange(index, "year", e.target.value, "titlesWon")} 
                        placeholder="Year won" 
                        min="1900"
                        max="2025"
                        className={`w-full p-2 border rounded-md ${formErrors[`title_${index}_year`] ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {formErrors[`title_${index}_year`] && <p className="text-red-500 text-xs mt-1">{formErrors[`title_${index}_year`]}</p>}
                    </div>
                  </div>
                </div>
              ))}
              
              <button 
                type="button" 
                onClick={() => addField("titlesWon", { title: "", year: "" })}
                className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 flex items-center justify-center gap-2 rounded-md border border-blue-200"
              >
                <Plus size={16} />
                Add Title
              </button>
            </div>

            {/* Related Content Section */}
            <div className="space-y-4 pt-2 border-t border-gray-200">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-700 pt-2">
                <Youtube size={18} />
                Related Content
              </h3>
              
              {formData.relatedContent.map((content, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-sm">Content #{index + 1}</h4>
                    <button 
                      type="button" 
                      onClick={() => removeField(index, "relatedContent")}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Title</label>
                      <input 
                        type="text" 
                        value={content.title} 
                        onChange={(e) => handleNestedChange(index, "title", e.target.value, "relatedContent")} 
                        placeholder="Content title" 
                        className={`w-full p-2 border rounded-md ${formErrors[`content_${index}_title`] ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {formErrors[`content_${index}_title`] && <p className="text-red-500 text-xs mt-1">{formErrors[`content_${index}_title`]}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">YouTube Link</label>
                      <input 
                        type="text" 
                        value={content.youtubeLink} 
                        onChange={(e) => handleNestedChange(index, "youtubeLink", e.target.value, "relatedContent")} 
                        placeholder="https://youtube.com/..." 
                        className={`w-full p-2 border rounded-md ${formErrors[`content_${index}_link`] ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {formErrors[`content_${index}_link`] && <p className="text-red-500 text-xs mt-1">{formErrors[`content_${index}_link`]}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Thumbnail URL</label>
                      <input 
                        type="text" 
                        value={content.imageUrl} 
                        onChange={(e) => handleNestedChange(index, "imageUrl", e.target.value, "relatedContent")} 
                        placeholder="Thumbnail image URL" 
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <button 
                type="button" 
                onClick={() => addField("relatedContent", { imageUrl: "", title: "", youtubeLink: "" })}
                className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 flex items-center justify-center gap-2 rounded-md border border-blue-200"
              >
                <Plus size={16} />
                Add Related Content
              </button>
            </div>

            {/* Form feedback */}
            {submitMessage.message && (
              <div className={`p-3 rounded ${submitMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {submitMessage.message}
              </div>
            )}
            
            {/* Submit button */}
            <div className="flex justify-center pt-4">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full md:w-1/3 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium disabled:bg-blue-400"
              >
                {isSubmitting ? "Submitting..." : "Add Athlete"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}