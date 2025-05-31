import React, { useState, useEffect, useMemo } from "react";
import photographersData from "../db.json";
import PhotographerCard from "../components/PhotographerCard.jsx";

function PhotographerList() {
  const [photographers, setPhotographers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [styleFilters, setStyleFilters] = useState([]); 
  const [cityFilter, setCityFilter] = useState("");
  const [sortOption, setSortOption] = useState("");

  const allStyles = useMemo(() => {
    const stylesSet = new Set();
    photographersData.photographers.forEach((p) =>
      p.tags.forEach((tag) => stylesSet.add(tag))
    );
    return Array.from(stylesSet);
  }, []);

  const allCities = useMemo(() => {
    const citiesSet = new Set();
    photographersData.photographers.forEach((p) => citiesSet.add(p.location));
    return Array.from(citiesSet);
  }, []);

  useEffect(() => {
    setPhotographers(photographersData.photographers);
  }, []);

  function matchesSearch(p, term) {
    const lowerTerm = term.toLowerCase();
    if (p.name.toLowerCase().includes(lowerTerm)) return true;
    if (p.location.toLowerCase().includes(lowerTerm)) return true;
    if (p.tags.some((tag) => tag.toLowerCase().includes(lowerTerm))) return true;
    return false;
  }

  const filteredPhotographers = useMemo(() => {
    let filtered = photographersData.photographers.filter((p) => {
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;

      if (p.rating < ratingFilter) return false;

      if (styleFilters.length > 0) {
        if (!styleFilters.some((style) => p.tags.includes(style))) return false;
      }

      if (cityFilter && p.location !== cityFilter) return false;

      if (searchTerm && !matchesSearch(p, searchTerm)) return false;

      return true;
    });

  
    if (sortOption === "priceLowHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "ratingHighLow") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "recentlyAdded") {
      
      filtered.sort((a, b) => b.id - a.id);
    }

    return filtered;
  }, [priceRange, ratingFilter, styleFilters, cityFilter, sortOption, searchTerm]);

  
  function toggleStyle(style) {
    setStyleFilters((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  }

  return (
    <div className="p-4 flex gap-6">
      
      <aside className="w-64 sticky top-4 self-start border rounded p-4 space-y-6 bg-white shadow-md">
        <h2 className="text-xl font-semibold mb-2">Filters</h2>

        
        <input
          type="text"
          placeholder="Search by name, location, or tag"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-blue-500"
        />

        
        <div>
          <label className="block font-semibold mb-1">Price Range (₹)</label>
          <div className="flex justify-between text-sm mb-1">
            <span>{priceRange[0]}</span>
            <span>{priceRange[1]}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full"
          />
          <input
            type="range"
            min="0"
            max={priceRange[1]}
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            className="w-full mt-2"
          />
        </div>


        <div>
          <label className="block font-semibold mb-1">Minimum Rating</label>
          {[4, 3, 2, 1].map((r) => (
            <label key={r} className="flex items-center space-x-2">
              <input
                type="radio"
                name="rating"
                checked={ratingFilter === r}
                onChange={() => setRatingFilter(r)}
                className="cursor-pointer"
              />
              <span>{r}+</span>
            </label>
          ))}
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="rating"
              checked={ratingFilter === 0}
              onChange={() => setRatingFilter(0)}
              className="cursor-pointer"
            />
            <span>Any</span>
          </label>
        </div>

        
        <div>
          <label className="block font-semibold mb-1">Styles</label>
          {allStyles.map((style) => (
            <label key={style} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={styleFilters.includes(style)}
                onChange={() => toggleStyle(style)}
                className="cursor-pointer"
              />
              <span>{style}</span>
            </label>
          ))}
        </div>

        
        <div>
          <label className="block font-semibold mb-1">City</label>
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="w-full border rounded px-2 py-1"
          >
            <option value="">All Cities</option>
            {allCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        
        <div>
          <label className="block font-semibold mb-1">Sort By</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full border rounded px-2 py-1"
          >
            <option value="">None</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="ratingHighLow">Rating: High to Low</option>
            <option value="recentlyAdded">Recently Added</option>
          </select>
        </div>
      </aside>

    
      <main className="flex-1">
        <h1 className="text-2xl font-bold mb-4">Photographers</h1>

        {filteredPhotographers.length === 0 ? (
          <p>No photographers found with these filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredPhotographers.map((p) => (
              <PhotographerCard key={p.id} photographer={p} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default PhotographerList;
