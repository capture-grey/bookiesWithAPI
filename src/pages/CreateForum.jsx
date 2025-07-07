"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import ForumInfo from "../components/createForum/ForumInfo";
import ForumRules from "../components/createForum/ForumRules";
import ForumCategories from "../components/createForum/ForumCategories";

export default function CreateForum() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
  });

  // Rules state
  const [rules, setRules] = useState([]);
  const [newRule, setNewRule] = useState({ header: "", description: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editRule, setEditRule] = useState({ header: "", description: "" });

  // Categories state
  const [categories, setCategories] = useState([]);
  const availableCategories = [
    "Fiction",
    "Non-Fiction",
    "Science",
    "History",
    "Biography",
    "Fantasy",
    "Mystery",
    "Romance",
    "Self-Help",
  ];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add new rule
  const addRule = () => {
    if (newRule.header && newRule.description) {
      setRules([...rules, newRule]);
      setNewRule({ header: "", description: "" });
    }
  };

  // Delete rule
  const deleteRule = (index) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  // Start editing rule
  const startEditing = (index) => {
    setEditingIndex(index);
    setEditRule(rules[index]);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingIndex(null);
  };

  // Save edited rule
  const saveEditedRule = () => {
    if (editRule.header && editRule.description) {
      const updatedRules = [...rules];
      updatedRules[editingIndex] = editRule;
      setRules(updatedRules);
      setEditingIndex(null);
    }
  };

  // Handle edit rule changes
  const handleEditRuleChange = (e) => {
    const { name, value } = e.target;
    setEditRule((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle category selection
  const toggleCategory = (category) => {
    setCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const forumData = {
      ...formData,
      rules,
      categories,
    };
    console.log("Forum data:", forumData);
    alert("Forum created successfully!\n(Check console for data)");
  };

  return (
    <div className="max-w-[960px] mx-auto p-4 bg-[#f9f7f3] min-h-screen">
      <div className="flex items-center mb-6">
        <button onClick={() => window.history.back()} className="mr-2">
          <ArrowLeft size={20} className="text-[#5a4a3a]" />
        </button>
        <h1 className="text-xl font-bold text-[#5a4a3a]">Create New Forum</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Forum Info */}
        <ForumInfo formData={formData} handleInputChange={handleInputChange} />

        {/* Rules */}
        <ForumRules
          rules={rules}
          newRule={newRule}
          setNewRule={setNewRule}
          addRule={addRule}
          deleteRule={deleteRule}
          editingIndex={editingIndex}
          editRule={editRule}
          startEditing={startEditing}
          cancelEditing={cancelEditing}
          saveEditedRule={saveEditedRule}
          handleEditRuleChange={handleEditRuleChange}
        />

        {/* Categories */}
        <ForumCategories
          categories={categories}
          availableCategories={availableCategories}
          toggleCategory={toggleCategory}
        />

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-[#85694d] text-white rounded-lg hover:bg-[#4a3a2a] font-medium"
          >
            Create Forum
          </button>
        </div>
      </form>
    </div>
  );
}
