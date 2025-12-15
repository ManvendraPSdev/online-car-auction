import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAuction } from "../api/auction.js";
import { useNavigate } from "react-router";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Select } from "../components/ui/Select";

export const CreateAuction = () => {
  const fileInputRef = useRef();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    itemName: "",
    itemDescription: "",
    itemCategory: "",
    startingPrice: "",
    itemStartDate: "",
    itemEndDate: "",
    itemPhoto: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createAuction,
    onSuccess: (data) => {
      setFormData({
        itemName: "",
        itemDescription: "",
        itemCategory: "",
        startingPrice: "",
        itemStartDate: "",
        itemEndDate: "",
        itemPhoto: "",
      });
      setError("");
      queryClient.invalidateQueries({ queryKey: ["viewAuctions"] });
      queryClient.invalidateQueries({ queryKey: ["allAuction"] });
      queryClient.invalidateQueries({ queryKey: ["myauctions"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });

      navigate(`/auction/${data.newAuction._id}`);
    },
    onError: (error) =>
      setError(error?.response?.data?.message || "Something went wrong"),
  });

  const categories = [
    "SUV",
    "Sedan",
    "Coupe",
    "Convertible",
    "Supercar",
    "Hypercar",
    "Luxury Vehicles",
    "Off-Road Vehicles",
    "Electric Vehicles",
    "Hybrid Vehicles",
    "Classic & Vintage Cars",
    "Performance Cars",
    "Modified / Custom Builds",
    "Commercial Vehicles",
    "Other Vehicles",
  ];
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);

      if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed.");
        return;
      }

      if (fileSizeMB > 5) {
        setError(`File size must be less than 5 MB.`);
        return;
      }

      setFormData((prev) => ({
        ...prev,
        itemPhoto: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.itemPhoto) {
      setError("Please upload an image.");
      return;
    }

    const start = new Date(formData.itemStartDate);
    const end = new Date(formData.itemEndDate);

    if (end <= start) {
      setError("End date must be after start date.");
      return;
    }

    mutate(formData);
  };

  //   today date
  const today = new Date().toISOString().split("T")[0];

  //   today+15 days
  const maxStart = new Date();
  maxStart.setDate(maxStart.getDate() + 15);
  const maxStartDate = maxStart.toISOString().split("T")[0];

  //   max end date
  let maxEndDate = "";
  if (formData.itemStartDate) {
    const end = new Date(formData.itemStartDate);
    end.setDate(end.getDate() + 15);
    maxEndDate = end.toISOString().split("T")[0];
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-lux-gradient opacity-80 pointer-events-none" />
      <main className="relative max-w-5xl mx-auto px-4 py-12 space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-ink-300">
            Create Auction
          </p>
          <h1 className="text-3xl font-semibold text-white mt-2">
            List a collector-grade vehicle
          </h1>
          <p className="text-ink-300 mt-1">
            Concierge workflow for premium, high-trust auctions.
          </p>
        </div>

        <Card className="bg-white/5 border-white/10 shadow-elevated p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              id="itemName"
              name="itemName"
              label="Vehicle title"
              placeholder="2024 Hyperion GT Carbon Edition"
              value={formData.itemName}
              onChange={handleInputChange}
              required
            />

            <div className="space-y-2">
              <label className="text-sm font-medium text-ink-100 tracking-tight">
                Highlights
              </label>
              <textarea
                id="itemDescription"
                name="itemDescription"
                value={formData.itemDescription}
                onChange={handleInputChange}
                rows={5}
                className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xs px-4 py-3 text-ink-50 placeholder:text-ink-400 focus:outline-none focus:border-accent/60 focus:shadow-[0_0_0_1px_rgba(159,135,255,0.45)]"
                placeholder="Carbon chassis, bespoke interior, delivery mileage, concierge logistics included."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Select
                label="Segment"
                options={categories.map((category) => ({
                  label: category,
                  value: category,
                }))}
                value={formData.itemCategory}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, itemCategory: value }))
                }
                placeholder="Choose a segment"
              />

              <Input
                id="startingPrice"
                name="startingPrice"
                type="number"
                min="1"
                step="1"
                label="Starting bid (USD)"
                placeholder="Reserve-free or set your floor"
                value={formData.startingPrice}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                id="itemStartDate"
                name="itemStartDate"
                type="date"
                label="Auction start"
                min={today}
                max={maxStartDate}
                value={formData.itemStartDate}
                onChange={handleInputChange}
                required
              />
              <Input
                id="itemEndDate"
                name="itemEndDate"
                type="date"
                label="Auction end"
                min={formData.itemStartDate}
                max={maxEndDate}
                value={formData.itemEndDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-ink-100 tracking-tight">
                Lead photo
              </label>
              <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-4 space-y-3">
                <input
                  type="file"
                  id="itemPhoto"
                  name="itemPhoto"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  accept="image/*"
                  className="w-full text-sm text-ink-200 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border file:border-white/10 file:bg-white/10 file:text-ink-50 hover:file:bg-white/15"
                />
                {formData.itemPhoto && (
                  <div className="flex items-center gap-4">
                    <img
                      src={URL.createObjectURL(formData.itemPhoto)}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded-xl border border-white/10"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, itemPhoto: "" }));
                        fileInputRef.current.value = "";
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-400/50 bg-red-500/10 text-red-200 px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-end pt-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating Auction..." : "Create premium auction"}
              </Button>
            </div>
          </form>
        </Card>

        <HelpSection />
      </main>
    </div>
  );
};

export const HelpSection = () => {
  return (
    <Card className="bg-white/5 border-white/10 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Concierge tips for a winning listing
      </h3>
      <ul className="space-y-2 text-ink-200 text-sm">
        <li>Capture dramatic angles with soft light and clean backgrounds.</li>
        <li>Detail provenance, service history, and any carbon/ceramic options.</li>
        <li>Set a competitive opening bid; enable reserve guidance if needed.</li>
        <li>Pick a 5–7 day window and align end time with peak bidder activity.</li>
      </ul>
    </Card>
  );
};
