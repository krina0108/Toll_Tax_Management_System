import React, { useState, useEffect, useRef } from "react";
import "./add_receipt.css";

// Custom Select Component for consistent styling
function CustomSelect({ name, value, onChange, options = [], placeholder = "Select" }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (opt) => {
    onChange({ target: { name, value: opt.value } });
    setOpen(false);
  };

  return (
    <div className={`custom-select ${open ? "open" : ""}`} ref={wrapperRef}>
      <button
        type="button"
        className="custom-select-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span className={`selected-text ${!value ? "placeholder" : ""}`}>
          {value || placeholder}
        </span>
        <span className="arrow">▾</span>
      </button>

      {open && (
        <ul className="custom-select-list" role="listbox">
          {options.map((opt, i) => (
            <li
              key={i}
              role="option"
              aria-selected={opt.value === value}
              className={`custom-select-option ${opt.value === value ? "active" : ""}`}
              onClick={() => handleSelect(opt)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function AddReceipt() {
  const [formData, setFormData] = useState({
    vehicleCategory: "",
    laneName: "",
    vehicleName: "",
    ownerName: "",
    vehicleDistrict: "",
    vehicleSeriesNumber: "",
    vehicleCity: "",
    trip: "",
    baseCost: "",
    gst: "",
    cost: "",
  });

  const [errors, setErrors] = useState({});

  // 🚗 Vehicle base rates (before GST)
  const tollBaseRates = {
    Bike: 20,
    Riksha: 30,
    Car: 50,
    LCV: 80,
    Bus: 150,
    Truck: 200,
    MAV: 300,
  };

  // Vehicle options for dropdown
  const vehicleOptions = Object.keys(tollBaseRates).map(vehicle => ({
    value: vehicle,
    label: vehicle
  }));

  // Category options
  const categoryOptions = [
    { value: "Two Wheeler", label: "Two Wheeler" },
    { value: "Three Wheeler", label: "Three Wheeler" },
    { value: "Four Wheeler", label: "Four Wheeler" },
    { value: "Six Wheeler", label: "Six Wheeler" },
    { value: "Heavy Wheeler", label: "Heavy Wheeler" }
  ];

  // Lane options
  const laneOptions = [
    { value: "Lane 1", label: "Lane 1" },
    { value: "Lane 2", label: "Lane 2" },
    { value: "Lane 3", label: "Lane 3" }
  ];

  // Trip options
  const tripOptions = [
    { value: "One Way", label: "One Way Trip" },
    { value: "Two Way", label: "Two Way Trip" }
  ];

  // ✅ All Indian Districts Data organized for dropdown
  const districtOptions = [
    // Gujarat
    { value: "GJ01", label: "GJ01 - Ahmedabad", city: "Ahmedabad" },
    { value: "GJ02", label: "GJ02 - Mehsana", city: "Mehsana" },
    { value: "GJ03", label: "GJ03 - Rajkot", city: "Rajkot" },
    { value: "GJ04", label: "GJ04 - Bhavnagar", city: "Bhavnagar" },
    { value: "GJ05", label: "GJ05 - Surat", city: "Surat" },
    { value: "GJ06", label: "GJ06 - Vadodara", city: "Vadodara" },
    { value: "GJ07", label: "GJ07 - Kheda", city: "Kheda" },
    { value: "GJ08", label: "GJ08 - Banas Kantha", city: "Banas Kantha" },
    { value: "GJ09", label: "GJ09 - Sabar Kantha", city: "Sabar Kantha" },
    { value: "GJ10", label: "GJ10 - Jamnagar", city: "Jamnagar" },
    { value: "GJ11", label: "GJ11 - Junagadh", city: "Junagadh" },
    { value: "GJ12", label: "GJ12 - Kutch", city: "Kutch" },
    { value: "GJ13", label: "GJ13 - Surendra Nagar", city: "Surendra Nagar" },
    { value: "GJ14", label: "GJ14 - Amreli", city: "Amreli" },
    { value: "GJ15", label: "GJ15 - Valsad", city: "Valsad" },
    { value: "GJ16", label: "GJ16 - Bharuch", city: "Bharuch" },
    { value: "GJ17", label: "GJ17 - Panchmahal", city: "Panchmahal" },
    { value: "GJ18", label: "GJ18 - Gandhi Nagar", city: "Gandhi Nagar" },
    { value: "GJ19", label: "GJ19 - Bardoli (Surat)", city: "Bardoli" },
    { value: "GJ20", label: "GJ20 - Dahod", city: "Dahod" },
    { value: "GJ21", label: "GJ21 - Navsari", city: "Navsari" },
    { value: "GJ22", label: "GJ22 - Narmada", city: "Narmada" },
    { value: "GJ23", label: "GJ23 - Anand", city: "Anand" },
    { value: "GJ24", label: "GJ24 - Patan", city: "Patan" },
    { value: "GJ25", label: "GJ25 - Porbander", city: "Porbander" },
    { value: "GJ26", label: "GJ26 - Tapi (Vyara)", city: "Vyara" },
    { value: "GJ27", label: "GJ27 - Ahmedabad (East)", city: "Ahmedabad" },
    { value: "GJ28", label: "GJ28 - Surat (West)", city: "Surat" },
    { value: "GJ29", label: "GJ29 - Vadodara (Rural)", city: "Vadodara" },
    { value: "GJ30", label: "GJ30 - Dang (Aahwa)", city: "Aahwa" },
    { value: "GJ31", label: "GJ31 - Modasa", city: "Modasa" },
    { value: "GJ32", label: "GJ32 - Veraval", city: "Veraval" },
    { value: "GJ33", label: "GJ33 - Botad", city: "Botad" },
    { value: "GJ34", label: "GJ34 - Chhota Udaipur", city: "Chhota Udaipur" },
    { value: "GJ35", label: "GJ35 - Lunavada", city: "Lunavada" },
    { value: "GJ36", label: "GJ36 - Morbi", city: "Morbi" },
    { value: "GJ37", label: "GJ37 - Khambhaliya", city: "Khambhaliya" },
    { value: "GJ38", label: "GJ38 - Bavla", city: "Bavla" },

    // Uttar Pradesh
    { value: "UP11", label: "UP11 - Saharanpur", city: "Saharanpur" },
    { value: "UP12", label: "UP12 - Muzaffarnagar", city: "Muzaffarnagar" },
    { value: "UP13", label: "UP13 - Bulandshahr", city: "Bulandshahr" },
    { value: "UP14", label: "UP14 - Ghaziabad", city: "Ghaziabad" },
    { value: "UP15", label: "UP15 - Meerut", city: "Meerut" },
    { value: "UP16", label: "UP16 - Noida", city: "Noida" },
    { value: "UP17", label: "UP17 - Baghpat", city: "Baghpat" },
    { value: "UP18", label: "UP18 - Greater Noida", city: "Greater Noida" },
    { value: "UP19", label: "UP19 - Shamli", city: "Shamli" },
    { value: "UP20", label: "UP20 - Bijnor", city: "Bijnor" },
    { value: "UP21", label: "UP21 - Moradabad", city: "Moradabad" },
    { value: "UP22", label: "UP22 - Rampur", city: "Rampur" },
    { value: "UP23", label: "UP23 - Amroha", city: "Amroha" },
    { value: "UP24", label: "UP24 - Badaun", city: "Badaun" },
    { value: "UP25", label: "UP25 - Bareilly", city: "Bareilly" },
    { value: "UP26", label: "UP26 - Pilibhit", city: "Pilibhit" },
    { value: "UP27", label: "UP27 - Shahjahanpur", city: "Shahjahanpur" },
    { value: "UP28", label: "UP28 - Ayodhya", city: "Ayodhya" },
    { value: "UP30", label: "UP30 - Hardoi", city: "Hardoi" },
    { value: "UP31", label: "UP31 - Lakhimpur Kheri", city: "Lakhimpur Kheri" },
    { value: "UP32", label: "UP32 - Lucknow", city: "Lucknow" },
    { value: "UP33", label: "UP33 - Rae Bareli", city: "Rae Bareli" },
    { value: "UP34", label: "UP34 - Sitapur", city: "Sitapur" },
    { value: "UP35", label: "UP35 - Unnao", city: "Unnao" },
    { value: "UP36", label: "UP36 - Amethi", city: "Amethi" },
    { value: "UP37", label: "UP37 - Hapur", city: "Hapur" },
    { value: "UP38", label: "UP38 - Sambhal", city: "Sambhal" },
    { value: "UP40", label: "UP40 - Bahraich", city: "Bahraich" },
    { value: "UP41", label: "UP41 - Barabanki", city: "Barabanki" },
    { value: "UP42", label: "UP42 - Faizabad", city: "Faizabad" },
    { value: "UP43", label: "UP43 - Gonda", city: "Gonda" },
    { value: "UP44", label: "UP44 - Sultanpur", city: "Sultanpur" },
    { value: "UP45", label: "UP45 - Ambedkar Nagar", city: "Akbarpur" },
    { value: "UP46", label: "UP46 - Shravasti", city: "Shravasti" },
    { value: "UP47", label: "UP47 - Balrampur", city: "Balrampur" },
    { value: "UP50", label: "UP50 - Azamgarh", city: "Azamgarh" },
    { value: "UP51", label: "UP51 - Basti", city: "Basti" },
    { value: "UP52", label: "UP52 - Deoria", city: "Deoria" },
    { value: "UP53", label: "UP53 - Gorakhpur", city: "Gorakhpur" },
    { value: "UP54", label: "UP54 - Mau", city: "Mau" },
    { value: "UP55", label: "UP55 - Siddharthnagar", city: "Siddharthnagar" },
    { value: "UP56", label: "UP56 - Maharajganj", city: "Maharajganj" },
    { value: "UP57", label: "UP57 - Padrauna", city: "Padrauna" },
    { value: "UP58", label: "UP58 - Sant Kabir Nagar", city: "Sant Kabir Nagar" },
    { value: "UP60", label: "UP60 - Ballia", city: "Ballia" },
    { value: "UP61", label: "UP61 - Ghazipur", city: "Ghazipur" },
    { value: "UP62", label: "UP62 - Jaunpur", city: "Jaunpur" },
    { value: "UP63", label: "UP63 - Mirzapur", city: "Mirzapur" },
    { value: "UP64", label: "UP64 - Sonbhadra", city: "Sonbhadra" },
    { value: "UP65", label: "UP65 - Varanasi", city: "Varanasi" },
    { value: "UP66", label: "UP66 - Bhadohi", city: "Bhadohi" },
    { value: "UP67", label: "UP67 - Chandauli", city: "Chandauli" },
    { value: "UP70", label: "UP70 - Prayagraj", city: "Prayagraj" },
    { value: "UP71", label: "UP71 - Fatehpur", city: "Fatehpur" },
    { value: "UP72", label: "UP72 - Pratapgarh", city: "Pratapgarh" },
    { value: "UP73", label: "UP73 - Kaushambi", city: "Kaushambi" },
    { value: "UP74", label: "UP74 - Kannauj", city: "Kannauj" },
    { value: "UP75", label: "UP75 - Etawah", city: "Etawah" },
    { value: "UP76", label: "UP76 - Farrukhabad", city: "Farrukhabad" },
    { value: "UP77", label: "UP77 - Kanpur Dehat", city: "Kanpur Dehat" },
    { value: "UP78", label: "UP78 - Kanpur Nagar", city: "Kanpur Nagar" },
    { value: "UP79", label: "UP79 - Auraiya", city: "Auraiya" },
    { value: "UP80", label: "UP80 - Agra", city: "Agra" },
    { value: "UP81", label: "UP81 - Aligarh", city: "Aligarh" },
    { value: "UP82", label: "UP82 - Etah", city: "Etah" },
    { value: "UP83", label: "UP83 - Firozabad", city: "Firozabad" },
    { value: "UP84", label: "UP84 - Mainpuri", city: "Mainpuri" },
    { value: "UP85", label: "UP85 - Mathura", city: "Mathura" },
    { value: "UP86", label: "UP86 - Hathras", city: "Hathras" },
    { value: "UP87", label: "UP87 - Kasganj", city: "Kasganj" },
    { value: "UP90", label: "UP90 - Banda", city: "Banda" },
    { value: "UP91", label: "UP91 - Hamirpur", city: "Hamirpur" },
    { value: "UP92", label: "UP92 - Jalaun", city: "Jalaun" },
    { value: "UP93", label: "UP93 - Jhansi", city: "Jhansi" },
    { value: "UP94", label: "UP94 - Lalitpur", city: "Lalitpur" },
    { value: "UP95", label: "UP95 - Mahoba", city: "Mahoba" },
    { value: "UP96", label: "UP96 - Chitrakoot Dham", city: "Karwi" },

    // Maharashtra
    { value: "MH01", label: "MH01 - Mumbai South", city: "Mumbai" },
    { value: "MH02", label: "MH02 - Mumbai West", city: "Mumbai" },
    { value: "MH03", label: "MH03 - Mumbai East", city: "Mumbai" },
    { value: "MH04", label: "MH04 - Thane", city: "Thane" },
    { value: "MH05", label: "MH05 - Kalyan", city: "Kalyan" },
    { value: "MH06", label: "MH06 - Raigad", city: "Raigad" },
    { value: "MH07", label: "MH07 - Sindhudurg", city: "Oros" },
    { value: "MH08", label: "MH08 - Ratnagiri", city: "Ratnagiri" },
    { value: "MH09", label: "MH09 - Kolhapur", city: "Kolhapur" },
    { value: "MH10", label: "MH10 - Sangli", city: "Sangli" },
    { value: "MH11", label: "MH11 - Satara", city: "Satara" },
    { value: "MH12", label: "MH12 - Pune Central", city: "Pune" },
    { value: "MH13", label: "MH13 - Solapur", city: "Solapur" },
    { value: "MH14", label: "MH14 - Pimpri-Chinchwad", city: "Pimpri-Chinchwad" },
    { value: "MH15", label: "MH15 - Nashik", city: "Nashik" },
    { value: "MH16", label: "MH16 - Ahmednagar", city: "Ahmednagar" },
    { value: "MH17", label: "MH17 - Shrirampur", city: "Shrirampur" },
    { value: "MH18", label: "MH18 - Dhule", city: "Dhule" },
    { value: "MH19", label: "MH19 - Jalgaon", city: "Jalgaon" },
    { value: "MH20", label: "MH20 - Aurangabad", city: "Aurangabad" },
    { value: "MH21", label: "MH21 - Jalna", city: "Jalna" },
    { value: "MH22", label: "MH22 - Parbhani", city: "Parbhani" },
    { value: "MH23", label: "MH23 - Beed", city: "Beed" },
    { value: "MH24", label: "MH24 - Latur", city: "Latur" },
    { value: "MH25", label: "MH25 - Osmanabad", city: "Osmanabad" },
    { value: "MH26", label: "MH26 - Nanded", city: "Nanded" },
    { value: "MH27", label: "MH27 - Amravati", city: "Amravati" },
    { value: "MH28", label: "MH28 - Buldhana", city: "Buldhana" },
    { value: "MH29", label: "MH29 - Yavatmal", city: "Yavatmal" },
    { value: "MH30", label: "MH30 - Akola", city: "Akola" },
    { value: "MH31", label: "MH31 - Nagpur Urban", city: "Nagpur" },
    { value: "MH32", label: "MH32 - Wardha", city: "Wardha" },
    { value: "MH33", label: "MH33 - Gadchiroli", city: "Gadchiroli" },
    { value: "MH34", label: "MH34 - Chandrapur", city: "Chandrapur" },
    { value: "MH35", label: "MH35 - Gondia", city: "Gondia" },
    { value: "MH36", label: "MH36 - Bhandara", city: "Bhandara" },
    { value: "MH37", label: "MH37 - Washim", city: "Washim" },
    { value: "MH38", label: "MH38 - Hingoli", city: "Hingoli" },
    { value: "MH39", label: "MH39 - Nandurbar", city: "Nandurbar" },
    { value: "MH40", label: "MH40 - Nagpur Rural", city: "Nagpur" },
    { value: "MH41", label: "MH41 - Malegaon", city: "Malegaon" },
    { value: "MH42", label: "MH42 - Baramati", city: "Baramati" },
    { value: "MH43", label: "MH43 - Vashi", city: "Navi Mumbai" },
    { value: "MH44", label: "MH44 - Ambejogai", city: "Ambejogai" },
    { value: "MH45", label: "MH45 - Akluj", city: "Akluj" },
    { value: "MH46", label: "MH46 - Panvel", city: "Panvel" },
    { value: "MH47", label: "MH47 - Borivali", city: "Mumbai" },
    { value: "MH48", label: "MH48 - Vasai", city: "Vasai" },
    { value: "MH49", label: "MH49 - Nagpur East", city: "Nagpur" },
    { value: "MH50", label: "MH50 - Karad", city: "Karad" },
    { value: "MH51", label: "MH51 - Sangamner", city: "Sangamner" },
    { value: "MH52", label: "MH52 - Parbhani Rural", city: "Parbhani" },
    { value: "MH53", label: "MH53 - Pune South", city: "Pune" },
    { value: "MH54", label: "MH54 - Pune North", city: "Pune" },
    { value: "MH55", label: "MH55 - Mumbai Central", city: "Mumbai" },

    // Delhi
    { value: "DL01", label: "DL01 - Central Delhi", city: "Delhi" },
    { value: "DL02", label: "DL02 - South Delhi", city: "Delhi" },
    { value: "DL03", label: "DL03 - East Delhi", city: "Delhi" },
    { value: "DL04", label: "DL04 - North Delhi", city: "Delhi" },
    { value: "DL05", label: "DL05 - West Delhi", city: "Delhi" },
    { value: "DL06", label: "DL06 - New Delhi", city: "Delhi" },
    { value: "DL07", label: "DL07 - North West Delhi", city: "Delhi" },
    { value: "DL08", label: "DL08 - South West Delhi", city: "Delhi" },
    { value: "DL09", label: "DL09 - Shahdara", city: "Delhi" },
    { value: "DL10", label: "DL10 - Central Delhi", city: "Delhi" },

    // Karnataka
    { value: "KA01", label: "KA01 - Bengaluru Central", city: "Bengaluru" },
    { value: "KA02", label: "KA02 - Bengaluru West", city: "Bengaluru" },
    { value: "KA03", label: "KA03 - Bengaluru East", city: "Bengaluru" },
    { value: "KA04", label: "KA04 - Bengaluru North", city: "Bengaluru" },
    { value: "KA05", label: "KA05 - Bengaluru South", city: "Bengaluru" },
    { value: "KA06", label: "KA06 - Tumakuru", city: "Tumakuru" },
    { value: "KA07", label: "KA07 - Kolar", city: "Kolar" },
    { value: "KA08", label: "KA08 - Kolar Gold Fields", city: "KGF" },
    { value: "KA09", label: "KA09 - Mysuru West", city: "Mysuru" },
    { value: "KA10", label: "KA10 - Chamarajanagar", city: "Chamarajanagar" },
    { value: "KA11", label: "KA11 - Mandya", city: "Mandya" },
    { value: "KA12", label: "KA12 - Madikeri", city: "Madikeri" },
    { value: "KA13", label: "KA13 - Hassan", city: "Hassan" },
    { value: "KA14", label: "KA14 - Shivamogga", city: "Shivamogga" },
    { value: "KA15", label: "KA15 - Sagar", city: "Sagar" },
    { value: "KA16", label: "KA16 - Chitradurga", city: "Chitradurga" },
    { value: "KA17", label: "KA17 - Davanagere", city: "Davanagere" },
    { value: "KA18", label: "KA18 - Chikkamagaluru", city: "Chikkamagaluru" },
    { value: "KA19", label: "KA19 - Mangaluru", city: "Mangaluru" },
    { value: "KA20", label: "KA20 - Udupi", city: "Udupi" },
    { value: "KA21", label: "KA21 - Puttur", city: "Puttur" },
    { value: "KA22", label: "KA22 - Belagavi", city: "Belagavi" },
    { value: "KA23", label: "KA23 - Chikkodi", city: "Chikkodi" },
    { value: "KA24", label: "KA24 - Bailhongal", city: "Bailhongal" },
    { value: "KA25", label: "KA25 - Dharwad", city: "Dharwad" },
    { value: "KA26", label: "KA26 - Gadag", city: "Gadag" },
    { value: "KA27", label: "KA27 - Haveri", city: "Haveri" },
    { value: "KA28", label: "KA28 - Vijayapura", city: "Vijayapura" },
    { value: "KA29", label: "KA29 - Bagalkot", city: "Bagalkot" },
    { value: "KA30", label: "KA30 - Karwar", city: "Karwar" },
    { value: "KA31", label: "KA31 - Sirsi", city: "Sirsi" },
    { value: "KA32", label: "KA32 - Kalaburagi", city: "Kalaburagi" },
    { value: "KA33", label: "KA33 - Yadgir", city: "Yadgir" },
    { value: "KA34", label: "KA34 - Ballari", city: "Ballari" },
    { value: "KA35", label: "KA35 - Hospet", city: "Hospet" },
    { value: "KA36", label: "KA36 - Raichur", city: "Raichur" },
    { value: "KA37", label: "KA37 - Koppal", city: "Koppal" },
    { value: "KA38", label: "KA38 - Bidar", city: "Bidar" },
    { value: "KA39", label: "KA39 - Bhalki", city: "Bhalki" },
    { value: "KA40", label: "KA40 - Chikkaballapur", city: "Chikkaballapur" },
    { value: "KA41", label: "KA41 - Kengeri", city: "Bengaluru" },
    { value: "KA42", label: "KA42 - Ramanagara", city: "Ramanagara" },
    { value: "KA43", label: "KA43 - Devanahalli", city: "Devanahalli" },
    { value: "KA44", label: "KA44 - Tiptur", city: "Tiptur" },
    { value: "KA45", label: "KA45 - Hunsur", city: "Hunsur" },
    { value: "KA46", label: "KA46 - Sakleshpur", city: "Sakleshpur" },
    { value: "KA47", label: "KA47 - Honnavar", city: "Honnavar" },
    { value: "KA48", label: "KA48 - Jamkhandi", city: "Jamkhandi" },
    { value: "KA49", label: "KA49 - Gokak", city: "Gokak" },
    { value: "KA50", label: "KA50 - Yelahanka", city: "Bengaluru" },
    { value: "KA51", label: "KA51 - Electronic City", city: "Bengaluru" },
    { value: "KA52", label: "KA52 - Nelamangala", city: "Nelamangala" },
    { value: "KA53", label: "KA53 - Krishnarajapuram", city: "Bengaluru" },
    { value: "KA54", label: "KA54 - Nagamangala", city: "Nagamangala" },
    { value: "KA55", label: "KA55 - Mysuru East", city: "Mysuru" },
    { value: "KA56", label: "KA56 - Basavakalyan", city: "Basavakalyan" },
    { value: "KA57", label: "KA57 - Shantinagar", city: "Bengaluru" },
    { value: "KA58", label: "KA58 - Banashankari", city: "Bengaluru" },
    { value: "KA59", label: "KA59 - Chamarajpet", city: "Bengaluru" },
    { value: "KA60", label: "KA60 - R.T. Nagar", city: "Bengaluru" },
    { value: "KA61", label: "KA61 - Marathahalli", city: "Bengaluru" },
    { value: "KA62", label: "KA62 - Surathkal", city: "Mangaluru" },
    { value: "KA63", label: "KA63 - Hubballi", city: "Hubballi" },
    { value: "KA64", label: "KA64 - Madhugiri", city: "Madhugiri" },
    { value: "KA65", label: "KA65 - Dandeli", city: "Dandeli" },
    { value: "KA66", label: "KA66 - Tarikere", city: "Tarikere" },
    { value: "KA67", label: "KA67 - Chintamani", city: "Chintamani" },
    { value: "KA68", label: "KA68 - Ranebennur", city: "Ranebennur" },
    { value: "KA69", label: "KA69 - Ramdurg", city: "Ramdurg" },
    { value: "KA70", label: "KA70 - Bantwal", city: "Bantwal" },
    { value: "KA71", label: "KA71 - Athani", city: "Athani" },

    // Tamil Nadu
    { value: "TN01", label: "TN01 - Chennai Central", city: "Chennai" },
    { value: "TN02", label: "TN02 - Chennai North West", city: "Chennai" },
    { value: "TN03", label: "TN03 - Chennai North East", city: "Chennai" },
    { value: "TN04", label: "TN04 - Chennai East", city: "Chennai" },
    { value: "TN07", label: "TN07 - Chennai South", city: "Chennai" },
    { value: "TN09", label: "TN09 - Chennai West", city: "Chennai" },
    { value: "TN11", label: "TN11 - Tambaram", city: "Tambaram" },
    { value: "TN13", label: "TN13 - Ambattur", city: "Ambattur" },
    { value: "TN14", label: "TN14 - Sholinganallur", city: "Sholinganallur" },
    { value: "TN19", label: "TN19 - Chengalpattu", city: "Chengalpattu" },
    { value: "TN20", label: "TN20 - Thiruvallur", city: "Thiruvallur" },
    { value: "TN21", label: "TN21 - Kanchipuram", city: "Kanchipuram" },
    { value: "TN23", label: "TN23 - Vellore", city: "Vellore" },
    { value: "TN24", label: "TN24 - Krishnagiri", city: "Krishnagiri" },
    { value: "TN25", label: "TN25 - Tiruvannamalai", city: "Tiruvannamalai" },
    { value: "TN28", label: "TN28 - Namakkal North", city: "Namakkal" },
    { value: "TN29", label: "TN29 - Dharmapuri", city: "Dharmapuri" },
    { value: "TN30", label: "TN30 - Salem West", city: "Salem" },
    { value: "TN31", label: "TN31 - Cuddalore", city: "Cuddalore" },
    { value: "TN32", label: "TN32 - Viluppuram", city: "Viluppuram" },
    { value: "TN33", label: "TN33 - Erode East", city: "Erode" },
    { value: "TN37", label: "TN37 - Coimbatore South", city: "Coimbatore" },
    { value: "TN38", label: "TN38 - Coimbatore North", city: "Coimbatore" },
    { value: "TN39", label: "TN39 - Tiruppur North", city: "Tiruppur" },
    { value: "TN43", label: "TN43 - Ooty", city: "Ooty" },
    { value: "TN45", label: "TN45 - Trichy West", city: "Trichy" },
    { value: "TN46", label: "TN46 - Perambalur", city: "Perambalur" },
    { value: "TN47", label: "TN47 - Karur", city: "Karur" },
    { value: "TN48", label: "TN48 - Srirangam", city: "Trichy" },
    { value: "TN49", label: "TN49 - Thanjavur", city: "Thanjavur" },
    { value: "TN50", label: "TN50 - Thiruvarur", city: "Thiruvarur" },
    { value: "TN51", label: "TN51 - Nagapattinam", city: "Nagapattinam" },
    { value: "TN55", label: "TN55 - Pudukkottai", city: "Pudukkottai" },
    { value: "TN57", label: "TN57 - Dindigul", city: "Dindigul" },
    { value: "TN58", label: "TN58 - Madurai South", city: "Madurai" },
    { value: "TN59", label: "TN59 - Madurai North", city: "Madurai" },
    { value: "TN60", label: "TN60 - Theni", city: "Theni" },
    { value: "TN61", label: "TN61 - Ariyalur", city: "Ariyalur" },
    { value: "TN63", label: "TN63 - Sivaganga", city: "Sivaganga" },
    { value: "TN64", label: "TN64 - Madurai Central", city: "Madurai" },
    { value: "TN65", label: "TN65 - Ramanathapuram", city: "Ramanathapuram" },
    { value: "TN66", label: "TN66 - Coimbatore Central", city: "Coimbatore" },
    { value: "TN67", label: "TN67 - Virudhunagar", city: "Virudhunagar" },
    { value: "TN69", label: "TN69 - Thoothukudi", city: "Thoothukudi" },
    { value: "TN70", label: "TN70 - Hosur", city: "Hosur" },
    { value: "TN72", label: "TN72 - Tirunelveli", city: "Tirunelveli" },
    { value: "TN74", label: "TN74 - Nagercoil", city: "Nagercoil" },
    { value: "TN76", label: "TN76 - Tenkasi", city: "Tenkasi" },
    { value: "TN82", label: "TN82 - Mayiladuthurai", city: "Mayiladuthurai" },
    { value: "TN88", label: "TN88 - Namakkal South", city: "Namakkal" },

    // West Bengal
    { value: "WB01", label: "WB01 - Kolkata", city: "Kolkata" },
    { value: "WB02", label: "WB02 - Kolkata", city: "Kolkata" },
    { value: "WB03", label: "WB03 - Kolkata", city: "Kolkata" },
    { value: "WB04", label: "WB04 - Kolkata", city: "Kolkata" },
    { value: "WB05", label: "WB05 - Kolkata", city: "Kolkata" },
    { value: "WB06", label: "WB06 - Kolkata", city: "Kolkata" },
    { value: "WB07", label: "WB07 - Kolkata", city: "Kolkata" },
    { value: "WB08", label: "WB08 - Kolkata", city: "Kolkata" },
    { value: "WB09", label: "WB09 - Kolkata", city: "Kolkata" },
    { value: "WB11", label: "WB11 - Howrah", city: "Howrah" },
    { value: "WB12", label: "WB12 - Howrah", city: "Howrah" },
    { value: "WB13", label: "WB13 - Uluberia", city: "Uluberia" },
    { value: "WB14", label: "WB14 - Uluberia", city: "Uluberia" },
    { value: "WB15", label: "WB15 - Chuchura", city: "Chuchura" },
    { value: "WB16", label: "WB16 - Chuchura", city: "Chuchura" },
    { value: "WB17", label: "WB17 - Serampore", city: "Serampore" },
    { value: "WB18", label: "WB18 - Dankuni/Arambagh", city: "Dankuni" },
    { value: "WB19", label: "WB19 - Alipore", city: "Alipore" },
    { value: "WB20", label: "WB20 - Alipore", city: "Alipore" },
    { value: "WB21", label: "WB21 - Basirhat", city: "Basirhat" },
    { value: "WB22", label: "WB22 - Alipore", city: "Alipore" },
    { value: "WB23", label: "WB23 - Barrackpore", city: "Barrackpore" },
    { value: "WB24", label: "WB24 - Barrackpore", city: "Barrackpore" },
    { value: "WB25", label: "WB25 - Barasat", city: "Barasat" },
    { value: "WB26", label: "WB26 - Barasat", city: "Barasat" },
    { value: "WB27", label: "WB27 - Bongaon", city: "Bongaon" },
    { value: "WB28", label: "WB28 - Bongaon", city: "Bongaon" },
    { value: "WB29", label: "WB29 - Tamluk", city: "Tamluk" },
    { value: "WB30", label: "WB30 - Tamluk", city: "Tamluk" },
    { value: "WB31", label: "WB31 - Contai", city: "Contai" },
    { value: "WB32", label: "WB32 - Contai", city: "Contai" },
    { value: "WB33", label: "WB33 - Midnapore", city: "Midnapore" },
    { value: "WB34", label: "WB34 - Midnapore", city: "Midnapore" },
    { value: "WB35", label: "WB35 - Kharagpur", city: "Kharagpur" },
    { value: "WB37", label: "WB37 - Asansol", city: "Asansol" },
    { value: "WB38", label: "WB38 - Asansol", city: "Asansol" },
    { value: "WB39", label: "WB39 - Durgapur", city: "Durgapur" },
    { value: "WB40", label: "WB40 - Durgapur", city: "Durgapur" },
    { value: "WB41", label: "WB41 - Burdwan", city: "Burdwan" },
    { value: "WB42", label: "WB42 - Burdwan", city: "Burdwan" },
    { value: "WB43", label: "WB43 - Kalna", city: "Kalna" },
    { value: "WB45", label: "WB45 - Rampurhat", city: "Rampurhat" },
    { value: "WB46", label: "WB46 - Rampurhat", city: "Rampurhat" },
    { value: "WB47", label: "WB47 - Bolpur", city: "Bolpur" },
    { value: "WB48", label: "WB48 - Bolpur", city: "Bolpur" },
    { value: "WB49", label: "WB49 - Jhargram", city: "Jhargram" },
    { value: "WB51", label: "WB51 - Krishnanagar", city: "Krishnanagar" },
    { value: "WB52", label: "WB52 - Krishnanagar", city: "Krishnanagar" },
    { value: "WB53", label: "WB53 - Suri", city: "Suri" },
    { value: "WB54", label: "WB54 - Suri", city: "Suri" },
    { value: "WB55", label: "WB55 - Purulia", city: "Purulia" },
    { value: "WB56", label: "WB56 - Purulia", city: "Purulia" },
    { value: "WB57", label: "WB57 - Berhampore", city: "Berhampore" },
    { value: "WB58", label: "WB58 - Berhampore", city: "Berhampore" },
    { value: "WB59", label: "WB59 - Raiganj", city: "Raiganj" },
    { value: "WB60", label: "WB60 - Raiganj", city: "Raiganj" },
    { value: "WB61", label: "WB61 - Balurghat", city: "Balurghat" },
    { value: "WB62", label: "WB62 - Balurghat", city: "Balurghat" },
    { value: "WB63", label: "WB63 - Cooch Behar", city: "Cooch Behar" },
    { value: "WB64", label: "WB64 - Cooch Behar", city: "Cooch Behar" },
    { value: "WB65", label: "WB65 - Malda", city: "Malda" },
    { value: "WB66", label: "WB66 - Malda", city: "Malda" },
    { value: "WB67", label: "WB67 - Bankura", city: "Bankura" },
    { value: "WB68", label: "WB68 - Bankura", city: "Bankura" },
    { value: "WB69", label: "WB69 - Alipurduar", city: "Alipurduar" },
    { value: "WB70", label: "WB70 - Alipurduar", city: "Alipurduar" },
    { value: "WB71", label: "WB71 - Jalpaiguri", city: "Jalpaiguri" },
    { value: "WB72", label: "WB72 - Jalpaiguri", city: "Jalpaiguri" },
    { value: "WB73", label: "WB73 - Siliguri", city: "Siliguri" },
    { value: "WB74", label: "WB74 - Siliguri", city: "Siliguri" },
    { value: "WB76", label: "WB76 - Darjeeling", city: "Darjeeling" },
    { value: "WB77", label: "WB77 - Darjeeling", city: "Darjeeling" },
    { value: "WB78", label: "WB78 - Kalimpong", city: "Kalimpong" },
    { value: "WB79", label: "WB79 - Kalimpong", city: "Kalimpong" },
    { value: "WB82", label: "WB82 - Raghunathpur", city: "Raghunathpur" },
    { value: "WB89", label: "WB89 - Kalyani", city: "Kalyani" },
    { value: "WB90", label: "WB90 - Kalyani", city: "Kalyani" },
    { value: "WB91", label: "WB91 - Islampur", city: "Islampur" },
    { value: "WB92", label: "WB92 - Islampur", city: "Islampur" },
    { value: "WB95", label: "WB95 - Baruipur", city: "Baruipur" },
    { value: "WB96", label: "WB96 - Baruipur", city: "Baruipur" },
    { value: "WB97", label: "WB97 - Diamond Harbour", city: "Diamond Harbour" },
    { value: "WB98", label: "WB98 - Diamond Harbour", city: "Diamond Harbour" },
    { value: "WB99", label: "WB99 - Jaynagar", city: "Jaynagar" },

    // Rajasthan
    { value: "RJ01", label: "RJ01 - Ajmer", city: "Ajmer" },
    { value: "RJ02", label: "RJ02 - Alwar", city: "Alwar" },
    { value: "RJ03", label: "RJ03 - Banswara", city: "Banswara" },
    { value: "RJ04", label: "RJ04 - Barmer", city: "Barmer" },
    { value: "RJ05", label: "RJ05 - Bharatpur", city: "Bharatpur" },
    { value: "RJ06", label: "RJ06 - Bhilwara", city: "Bhilwara" },
    { value: "RJ07", label: "RJ07 - Bikaner", city: "Bikaner" },
    { value: "RJ08", label: "RJ08 - Bundi", city: "Bundi" },
    { value: "RJ09", label: "RJ09 - Chittorgarh", city: "Chittorgarh" },
    { value: "RJ10", label: "RJ10 - Churu", city: "Churu" },
    { value: "RJ11", label: "RJ11 - Dholpur", city: "Dholpur" },
    { value: "RJ12", label: "RJ12 - Dungarpur", city: "Dungarpur" },
    { value: "RJ13", label: "RJ13 - Sri Ganganagar", city: "Sri Ganganagar" },
    { value: "RJ14", label: "RJ14 - Jaipur South", city: "Jaipur" },
    { value: "RJ15", label: "RJ15 - Jaisalmer", city: "Jaisalmer" },
    { value: "RJ16", label: "RJ16 - Jalore", city: "Jalore" },
    { value: "RJ17", label: "RJ17 - Jhalawar", city: "Jhalawar" },
    { value: "RJ18", label: "RJ18 - Jhunjhunu", city: "Jhunjhunu" },
    { value: "RJ19", label: "RJ19 - Jodhpur", city: "Jodhpur" },
    { value: "RJ20", label: "RJ20 - Kota", city: "Kota" },
    { value: "RJ21", label: "RJ21 - Nagaur", city: "Nagaur" },
    { value: "RJ22", label: "RJ22 - Pali", city: "Pali" },
    { value: "RJ23", label: "RJ23 - Sikar", city: "Sikar" },
    { value: "RJ24", label: "RJ24 - Sirohi", city: "Sirohi" },
    { value: "RJ25", label: "RJ25 - Sawai Madhopur", city: "Sawai Madhopur" },
    { value: "RJ26", label: "RJ26 - Tonk", city: "Tonk" },
    { value: "RJ27", label: "RJ27 - Udaipur", city: "Udaipur" },
    { value: "RJ28", label: "RJ28 - Baran", city: "Baran" },
    { value: "RJ29", label: "RJ29 - Dausa", city: "Dausa" },
    { value: "RJ30", label: "RJ30 - Rajsamand", city: "Rajsamand" },
    { value: "RJ31", label: "RJ31 - Hanumangarh", city: "Hanumangarh" },
    { value: "RJ32", label: "RJ32 - Kotputli", city: "Kotputli" },
    { value: "RJ33", label: "RJ33 - Ramganj Mandi", city: "Ramganj Mandi" },
    { value: "RJ34", label: "RJ34 - Karauli", city: "Karauli" },
    { value: "RJ35", label: "RJ35 - Pratapgarh", city: "Pratapgarh" },
    { value: "RJ36", label: "RJ36 - Beawar", city: "Beawar" },
    { value: "RJ37", label: "RJ37 - Didwana", city: "Didwana" },
    { value: "RJ38", label: "RJ38 - Abu Road", city: "Abu Road" },
    { value: "RJ39", label: "RJ39 - Balotra", city: "Balotra" },
    { value: "RJ40", label: "RJ40 - Bhiwadi", city: "Bhiwadi" },
    { value: "RJ41", label: "RJ41 - Chomu", city: "Chomu" },
    { value: "RJ42", label: "RJ42 - Kishangarh", city: "Kishangarh" },
    { value: "RJ43", label: "RJ43 - Phalodi", city: "Phalodi" },
    { value: "RJ44", label: "RJ44 - Sujangarh", city: "Sujangarh" },
    { value: "RJ45", label: "RJ45 - Jaipur North", city: "Jaipur" },
    { value: "RJ46", label: "RJ46 - Bhinmal", city: "Bhinmal" },
    { value: "RJ47", label: "RJ47 - Dudu", city: "Dudu" },
    { value: "RJ48", label: "RJ48 - Kekri", city: "Kekri" },
    { value: "RJ49", label: "RJ49 - Nohar", city: "Nohar" },
    { value: "RJ50", label: "RJ50 - Nokha", city: "Nokha" },
    { value: "RJ51", label: "RJ51 - Shahpura", city: "Shahpura" },
    { value: "RJ52", label: "RJ52 - Shahpura", city: "Shahpura" },
    { value: "RJ53", label: "RJ53 - Khetri", city: "Khetri" },
    { value: "RJ60", label: "RJ60 - Jaipur West", city: "Jaipur" },

    // Andhra Pradesh
    { value: "AP02", label: "AP02 - Anantapur", city: "Anantapur" },
    { value: "AP03", label: "AP03 - Chittoor", city: "Chittoor" },
    { value: "AP04", label: "AP04 - Kadapa", city: "Kadapa" },
    { value: "AP05", label: "AP05 - Kakinada", city: "Kakinada" },
    { value: "AP06", label: "AP06 - Kakinada", city: "Kakinada" },
    { value: "AP07", label: "AP07 - Guntur", city: "Guntur" },
    { value: "AP08", label: "AP08 - Guntur", city: "Guntur" },
    { value: "AP16", label: "AP16 - Vijayawada", city: "Vijayawada" },
    { value: "AP17", label: "AP17 - Vijayawada", city: "Vijayawada" },
    { value: "AP18", label: "AP18 - Vijayawada", city: "Vijayawada" },
    { value: "AP19", label: "AP19 - Vijayawada", city: "Vijayawada" },
    { value: "AP21", label: "AP21 - Kurnool", city: "Kurnool" },
    { value: "AP26", label: "AP26 - Nellore", city: "Nellore" },
    { value: "AP27", label: "AP27 - Ongole", city: "Ongole" },
    { value: "AP30", label: "AP30 - Srikakulam", city: "Srikakulam" },
    { value: "AP31", label: "AP31 - Visakhapatnam", city: "Visakhapatnam" },
    { value: "AP32", label: "AP32 - Visakhapatnam", city: "Visakhapatnam" },
    { value: "AP33", label: "AP33 - Visakhapatnam", city: "Visakhapatnam" },
    { value: "AP34", label: "AP34 - Visakhapatnam", city: "Visakhapatnam" },
    { value: "AP35", label: "AP35 - Vizianagaram", city: "Vizianagaram" },
    { value: "AP37", label: "AP37 - Eluru", city: "Eluru" },
    { value: "AP38", label: "AP38 - Eluru", city: "Eluru" },

    // Bihar
    { value: "BR01", label: "BR01 - Patna", city: "Patna" },
    { value: "BR02", label: "BR02 - Gaya", city: "Gaya" },
    { value: "BR03", label: "BR03 - Arrah", city: "Arrah" },
    { value: "BR04", label: "BR04 - Chapra", city: "Chapra" },
    { value: "BR05", label: "BR05 - Motihari", city: "Motihari" },
    { value: "BR06", label: "BR06 - Muzaffarpur", city: "Muzaffarpur" },
    { value: "BR07", label: "BR07 - Darbhanga", city: "Darbhanga" },
    { value: "BR08", label: "BR08 - Munger", city: "Munger" },
    { value: "BR09", label: "BR09 - Begusarai", city: "Begusarai" },
    { value: "BR10", label: "BR10 - Bhagalpur", city: "Bhagalpur" },
    { value: "BR11", label: "BR11 - Purnia", city: "Purnia" },
    { value: "BR19", label: "BR19 - Saharsa", city: "Saharsa" },
    { value: "BR21", label: "BR21 - Bihar Sharif", city: "Bihar Sharif" },
    { value: "BR22", label: "BR22 - Bettiah", city: "Bettiah" },
    { value: "BR24", label: "BR24 - Dehri", city: "Dehri" },
    { value: "BR25", label: "BR25 - Jehanabad", city: "Jehanabad" },
    { value: "BR26", label: "BR26 - Aurangabad", city: "Aurangabad" },
    { value: "BR27", label: "BR27 - Nawada", city: "Nawada" },
    { value: "BR28", label: "BR28 - Gopalganj", city: "Gopalganj" },
    { value: "BR29", label: "BR29 - Siwan", city: "Siwan" },
    { value: "BR30", label: "BR30 - Sitamarhi", city: "Sitamarhi" },
    { value: "BR31", label: "BR31 - Hajipur", city: "Hajipur" },
    { value: "BR32", label: "BR32 - Madhubani", city: "Madhubani" },
    { value: "BR33", label: "BR33 - Samastipur", city: "Samastipur" },
    { value: "BR34", label: "BR34 - Khagaria", city: "Khagaria" },
    { value: "BR37", label: "BR37 - Kishanganj", city: "Kishanganj" },
    { value: "BR38", label: "BR38 - Araria", city: "Araria" },
    { value: "BR39", label: "BR39 - Katihar", city: "Katihar" },
    { value: "BR43", label: "BR43 - Madhepura", city: "Madhepura" },
    { value: "BR44", label: "BR44 - Buxar", city: "Buxar" },
    { value: "BR45", label: "BR45 - Bhabua", city: "Bhabua" },
    { value: "BR46", label: "BR46 - Jamui", city: "Jamui" },
    { value: "BR50", label: "BR50 - Supaul", city: "Supaul" },
    { value: "BR51", label: "BR51 - Banka", city: "Banka" },
    { value: "BR52", label: "BR52 - Sheikhpura", city: "Sheikhpura" },
    { value: "BR53", label: "BR53 - Lakhisarai", city: "Lakhisarai" },
    { value: "BR55", label: "BR55 - Sheohar", city: "Sheohar" },
    { value: "BR56", label: "BR56 - Arwal", city: "Arwal" },
    { value: "BR57", label: "BR57 - Rohtas", city: "Rohtas" },

    // Punjab
    { value: "PB01", label: "PB01 - Chandigarh", city: "Chandigarh" },
    { value: "PB02", label: "PB02 - Amritsar", city: "Amritsar" },
    { value: "PB03", label: "PB03 - Bathinda", city: "Bathinda" },
    { value: "PB04", label: "PB04 - Faridkot", city: "Faridkot" },
    { value: "PB05", label: "PB05 - Ferozepur", city: "Ferozepur" },
    { value: "PB06", label: "PB06 - Gurdaspur", city: "Gurdaspur" },
    { value: "PB07", label: "PB07 - Hoshiarpur", city: "Hoshiarpur" },
    { value: "PB08", label: "PB08 - Jalandhar", city: "Jalandhar" },
    { value: "PB09", label: "PB09 - Kapurthala", city: "Kapurthala" },
    { value: "PB10", label: "PB10 - Ludhiana", city: "Ludhiana" },
    { value: "PB11", label: "PB11 - Patiala", city: "Patiala" },
    { value: "PB12", label: "PB12 - Rupnagar", city: "Rupnagar" },
    { value: "PB13", label: "PB13 - Sangrur", city: "Sangrur" },
    { value: "PB14", label: "PB14 - Ajnala", city: "Ajnala" },
    { value: "PB15", label: "PB15 - Abohar", city: "Abohar" },
    { value: "PB16", label: "PB16 - Anandpur Sahib", city: "Anandpur Sahib" },
    { value: "PB17", label: "PB17 - Baba Bakala", city: "Baba Bakala" },
    { value: "PB18", label: "PB18 - Batala", city: "Batala" },
    { value: "PB19", label: "PB19 - Barnala", city: "Barnala" },
    { value: "PB20", label: "PB20 - Balachaur", city: "Balachaur" },
    { value: "PB21", label: "PB21 - Dasuya", city: "Dasuya" },
    { value: "PB22", label: "PB22 - Fazilka", city: "Fazilka" },
    { value: "PB23", label: "PB23 - Fatehgarh Sahib", city: "Fatehgarh Sahib" },
    { value: "PB24", label: "PB24 - Garhshankar", city: "Garhshankar" },
    { value: "PB25", label: "PB25 - Jagraon", city: "Jagraon" },
    { value: "PB26", label: "PB26 - Khanna", city: "Khanna" },
    { value: "PB27", label: "PB27 - Kharar", city: "Kharar" },
    { value: "PB28", label: "PB28 - Malerkotla", city: "Malerkotla" },
    { value: "PB29", label: "PB29 - Moga", city: "Moga" },
    { value: "PB30", label: "PB30 - Sri Muktsar Sahib", city: "Sri Muktsar Sahib" },
    { value: "PB31", label: "PB31 - Mansa", city: "Mansa" },
    { value: "PB32", label: "PB32 - Nawanshahr", city: "Nawanshahr" },
    { value: "PB33", label: "PB33 - Nakodar", city: "Nakodar" },
    { value: "PB34", label: "PB34 - Nabha", city: "Nabha" },
    { value: "PB35", label: "PB35 - Pathankot", city: "Pathankot" },
    { value: "PB36", label: "PB36 - Phagwara", city: "Phagwara" },
    { value: "PB37", label: "PB37 - Phillaur", city: "Phillaur" },
    { value: "PB38", label: "PB38 - Patti", city: "Patti" },
    { value: "PB39", label: "PB39 - Rajpura", city: "Rajpura" },
    { value: "PB40", label: "PB40 - Rampura Phul", city: "Rampura Phul" },
    { value: "PB41", label: "PB41 - Sultanpur Lodhi", city: "Sultanpur Lodhi" },
    { value: "PB42", label: "PB42 - Samana", city: "Samana" },
    { value: "PB43", label: "PB43 - Samrala", city: "Samrala" },
    { value: "PB44", label: "PB44 - Sunam", city: "Sunam" },
    { value: "PB45", label: "PB45 - Talwandi Sabo", city: "Talwandi Sabo" },
    { value: "PB46", label: "PB46 - Tarn Taran", city: "Tarn Taran" },
    { value: "PB47", label: "PB47 - Zira", city: "Zira" },
    { value: "PB65", label: "PB65 - Mohali", city: "Mohali" },
    { value: "PB70", label: "PB70 - Dera Bassi", city: "Dera Bassi" },

    // Haryana
    { value: "HR01", label: "HR01 - Ambala North", city: "Ambala" },
    { value: "HR02", label: "HR02 - Jagadhri", city: "Jagadhri" },
    { value: "HR03", label: "HR03 - Panchkula", city: "Panchkula" },
    { value: "HR04", label: "HR04 - Narainagarh", city: "Narainagarh" },
    { value: "HR05", label: "HR05 - Karnal", city: "Karnal" },
    { value: "HR06", label: "HR06 - Panipat", city: "Panipat" },
    { value: "HR07", label: "HR07 - Thanesar", city: "Thanesar" },
    { value: "HR08", label: "HR08 - Kaithal", city: "Kaithal" },
    { value: "HR09", label: "HR09 - Guhla", city: "Guhla" },
    { value: "HR10", label: "HR10 - Sonipat", city: "Sonipat" },
    { value: "HR11", label: "HR11 - Gohana", city: "Gohana" },
    { value: "HR12", label: "HR12 - Rohtak", city: "Rohtak" },
    { value: "HR13", label: "HR13 - Bahadurgarh", city: "Bahadurgarh" },
    { value: "HR14", label: "HR14 - Jhajjar", city: "Jhajjar" },
    { value: "HR15", label: "HR15 - Meham", city: "Meham" },
    { value: "HR16", label: "HR16 - Bhiwani", city: "Bhiwani" },
    { value: "HR17", label: "HR17 - Siwani", city: "Siwani" },
    { value: "HR18", label: "HR18 - Loharu", city: "Loharu" },
    { value: "HR19", label: "HR19 - Charkhi Dadri", city: "Charkhi Dadri" },
    { value: "HR20", label: "HR20 - Hisar", city: "Hisar" },
    { value: "HR21", label: "HR21 - Hansi", city: "Hansi" },
    { value: "HR22", label: "HR22 - Fatehabad", city: "Fatehabad" },
    { value: "HR23", label: "HR23 - Tohana", city: "Tohana" },
    { value: "HR24", label: "HR24 - Sirsa", city: "Sirsa" },
    { value: "HR25", label: "HR25 - Mandi Dabwali", city: "Mandi Dabwali" },
    { value: "HR26", label: "HR26 - Gurugram", city: "Gurugram" },
    { value: "HR27", label: "HR27 - Nuh", city: "Nuh" },
    { value: "HR28", label: "HR28 - Ferozepur Jhirka", city: "Ferozepur Jhirka" },
    { value: "HR29", label: "HR29 - Ballabgarh", city: "Ballabgarh" },
    { value: "HR30", label: "HR30 - Palwal", city: "Palwal" },
    { value: "HR31", label: "HR31 - Jind", city: "Jind" },
    { value: "HR32", label: "HR32 - Narwana", city: "Narwana" },
    { value: "HR33", label: "HR33 - Safidon", city: "Safidon" },
    { value: "HR34", label: "HR34 - Mahendragarh", city: "Mahendragarh" },
    { value: "HR35", label: "HR35 - Narnaul", city: "Narnaul" },
    { value: "HR36", label: "HR36 - Rewari", city: "Rewari" },
    { value: "HR37", label: "HR37 - Ambala", city: "Ambala" },
    { value: "HR38", label: "HR38 - Faridabad", city: "Faridabad" },
    { value: "HR39", label: "HR39 - Hisar", city: "Hisar" },
    { value: "HR40", label: "HR40 - Assandh", city: "Assandh" },
    { value: "HR41", label: "HR41 - Pehowa", city: "Pehowa" },
    { value: "HR42", label: "HR42 - Ganaur", city: "Ganaur" },
    { value: "HR43", label: "HR43 - Kosli", city: "Kosli" },
    { value: "HR44", label: "HR44 - Ellenabad", city: "Ellenabad" },
    { value: "HR45", label: "HR45 - Karnal", city: "Karnal" },
    { value: "HR46", label: "HR46 - Rohtak", city: "Rohtak" },
    { value: "HR47", label: "HR47 - Rewari", city: "Rewari" },
    { value: "HR48", label: "HR48 - Tosham", city: "Tosham" },
    { value: "HR49", label: "HR49 - Kalka", city: "Kalka" },
    { value: "HR50", label: "HR50 - Hodal", city: "Hodal" },
    { value: "HR51", label: "HR51 - Faridabad", city: "Faridabad" },
    { value: "HR52", label: "HR52 - Hathin", city: "Hathin" },
    { value: "HR53", label: "HR53 - Adampur", city: "Adampur" },
    { value: "HR54", label: "HR54 - Barara", city: "Barara" },
    { value: "HR55", label: "HR55 - Gurugram", city: "Gurugram" },
    { value: "HR56", label: "HR56 - Jind", city: "Jind" },
    { value: "HR57", label: "HR57 - Sirsa", city: "Sirsa" },
    { value: "HR58", label: "HR58 - Yamunanagar", city: "Yamunanagar" },
    { value: "HR59", label: "HR59 - Ratia", city: "Ratia" },
    { value: "HR60", label: "HR60 - Samalkha", city: "Samalkha" },
    { value: "HR61", label: "HR61 - Bhiwani", city: "Bhiwani" },
    { value: "HR62", label: "HR62 - Fatehabad", city: "Fatehabad" },
    { value: "HR63", label: "HR63 - Jhajjar", city: "Jhajjar" },
    { value: "HR64", label: "HR64 - Kaithal", city: "Kaithal" },
    { value: "HR65", label: "HR65 - Kurukshetra", city: "Kurukshetra" },
    { value: "HR66", label: "HR66 - Narnaul", city: "Narnaul" },
    { value: "HR67", label: "HR67 - Panipat", city: "Panipat" },
    { value: "HR68", label: "HR68 - Panchkula", city: "Panchkula" },
    { value: "HR69", label: "HR69 - Sonipat", city: "Sonipat" },
    { value: "HR70", label: "HR70 - Chandigarh", city: "Chandigarh" },
    { value: "HR71", label: "HR71 - Bilaspur", city: "Bilaspur" },
    { value: "HR72", label: "HR72 - Gurugram", city: "Gurugram" },
    { value: "HR73", label: "HR73 - Palwal", city: "Palwal" },
    { value: "HR74", label: "HR74 - Nuh", city: "Nuh" },
    { value: "HR75", label: "HR75 - Indri", city: "Indri" },
    { value: "HR76", label: "HR76 - Pataudi", city: "Pataudi" },
    { value: "HR77", label: "HR77 - Beri", city: "Beri" },
    { value: "HR78", label: "HR78 - Shahabad", city: "Shahabad" },
    { value: "HR79", label: "HR79 - Kharkhoda", city: "Kharkhoda" },
    { value: "HR80", label: "HR80 - Barwala", city: "Barwala" },
    { value: "HR81", label: "HR81 - Bawal", city: "Bawal" },
    { value: "HR82", label: "HR82 - Kanina", city: "Kanina" },
    { value: "HR83", label: "HR83 - Kalayat", city: "Kalayat" },
    { value: "HR84", label: "HR84 - Charkhi Dadri", city: "Charkhi Dadri" },
    { value: "HR85", label: "HR85 - Ambala Cantt", city: "Ambala" },
    { value: "HR86", label: "HR86 - Narnaul", city: "Narnaul" },
    { value: "HR87", label: "HR87 - Badkhal", city: "Badkhal" },
    { value: "HR88", label: "HR88 - Badhra", city: "Badhra" },
    { value: "HR89", label: "HR89 - Badli", city: "Badli" },
    { value: "HR90", label: "HR90 - Uchana", city: "Uchana" },
    { value: "HR91", label: "HR91 - Gharaunda", city: "Gharaunda" },
    { value: "HR92", label: "HR92 - Radaur", city: "Radaur" },
    { value: "HR93", label: "HR93 - Punhana", city: "Punhana" },
    { value: "HR94", label: "HR94 - Kalanwali", city: "Kalanwali" },
    { value: "HR95", label: "HR95 - Sampla", city: "Sampla" },
    { value: "HR96", label: "HR96 - Tauru", city: "Tauru" },
    { value: "HR97", label: "HR97 - Ladwa", city: "Ladwa" },

    // Madhya Pradesh
    { value: "MP01", label: "MP01 - Governor's Vehicle", city: "Bhopal" },
    { value: "MP02", label: "MP02 - MP Government", city: "Bhopal" },
    { value: "MP03", label: "MP03 - MP Police", city: "Bhopal" },
    { value: "MP04", label: "MP04 - Bhopal", city: "Bhopal" },
    { value: "MP05", label: "MP05 - Hoshangabad", city: "Hoshangabad" },
    { value: "MP06", label: "MP06 - Morena", city: "Morena" },
    { value: "MP07", label: "MP07 - Gwalior", city: "Gwalior" },
    { value: "MP08", label: "MP08 - Guna", city: "Guna" },
    { value: "MP09", label: "MP09 - Indore", city: "Indore" },
    { value: "MP10", label: "MP10 - Khargone", city: "Khargone" },
    { value: "MP11", label: "MP11 - Dhar", city: "Dhar" },
    { value: "MP12", label: "MP12 - Khandwa", city: "Khandwa" },
    { value: "MP13", label: "MP13 - Ujjain", city: "Ujjain" },
    { value: "MP14", label: "MP14 - Mandsaur", city: "Mandsaur" },
    { value: "MP15", label: "MP15 - Sagar", city: "Sagar" },
    { value: "MP16", label: "MP16 - Chhatarpur", city: "Chhatarpur" },
    { value: "MP17", label: "MP17 - Rewa", city: "Rewa" },
    { value: "MP18", label: "MP18 - Shahdol", city: "Shahdol" },
    { value: "MP19", label: "MP19 - Satna", city: "Satna" },
    { value: "MP20", label: "MP20 - Jabalpur", city: "Jabalpur" },
    { value: "MP21", label: "MP21 - Katni", city: "Katni" },
    { value: "MP22", label: "MP22 - Seoni", city: "Seoni" },
    { value: "MP23", label: "MP23 - Rajpur", city: "Rajpur" },
    { value: "MP24", label: "MP24 - Durg", city: "Durg" },
    { value: "MP25", label: "MP25 - Jagdalpur", city: "Jagdalpur" },
    { value: "MP26", label: "MP26 - Bilaspur", city: "Bilaspur" },
    { value: "MP27", label: "MP27 - Ambikapur", city: "Ambikapur" },
    { value: "MP28", label: "MP28 - Chhindwara", city: "Chhindwara" },
    { value: "MP29", label: "MP29 - Rajnandgaon", city: "Rajnandgaon" },
    { value: "MP30", label: "MP30 - Bhind", city: "Bhind" },
    { value: "MP31", label: "MP31 - Sheopur", city: "Sheopur" },
    { value: "MP32", label: "MP32 - Datia", city: "Datia" },
    { value: "MP33", label: "MP33 - Shivpuri", city: "Shivpuri" },
    { value: "MP34", label: "MP34 - Damoh", city: "Damoh" },
    { value: "MP35", label: "MP35 - Panna", city: "Panna" },
    { value: "MP36", label: "MP36 - Tikamgarh", city: "Tikamgarh" },
    { value: "MP37", label: "MP37 - Sehore", city: "Sehore" },
    { value: "MP38", label: "MP38 - Raisen", city: "Raisen" },
    { value: "MP39", label: "MP39 - Rajgarh", city: "Rajgarh" },
    { value: "MP40", label: "MP40 - Vidisha", city: "Vidisha" },
    { value: "MP41", label: "MP41 - Dewas", city: "Dewas" },
    { value: "MP42", label: "MP42 - Shajapur", city: "Shajapur" },
    { value: "MP43", label: "MP43 - Ratlam", city: "Ratlam" },
    { value: "MP44", label: "MP44 - Neemuch", city: "Neemuch" },
    { value: "MP45", label: "MP45 - Jhabua", city: "Jhabua" },
    { value: "MP46", label: "MP46 - Barwani", city: "Barwani" },
    { value: "MP47", label: "MP47 - Harda", city: "Harda" },
    { value: "MP48", label: "MP48 - Betul", city: "Betul" },
    { value: "MP49", label: "MP49 - Narsinghpur", city: "Narsinghpur" },
    { value: "MP50", label: "MP50 - Balaghat", city: "Balaghat" },
    { value: "MP51", label: "MP51 - Mandla", city: "Mandla" },
    { value: "MP52", label: "MP52 - Dindori", city: "Dindori" },
    { value: "MP53", label: "MP53 - Sidhi", city: "Sidhi" },
    { value: "MP54", label: "MP54 - Umariya", city: "Umariya" },
    { value: "MP55", label: "MP55 - Bagli", city: "Bagli" },
    { value: "MP65", label: "MP65 - Anuppur", city: "Anuppur" },
    { value: "MP66", label: "MP66 - Singrauli", city: "Singrauli" },
    { value: "MP67", label: "MP67 - Ashoknagar", city: "Ashoknagar" },
    { value: "MP68", label: "MP68 - Burhanpur", city: "Burhanpur" },
    { value: "MP69", label: "MP69 - Alirajpur", city: "Alirajpur" },
    { value: "MP70", label: "MP70 - Agar Malwa", city: "Agar Malwa" },

    // Kerala
    { value: "KL01", label: "KL01 - Thiruvananthapuram", city: "Thiruvananthapuram" },
    { value: "KL02", label: "KL02 - Kollam", city: "Kollam" },
    { value: "KL03", label: "KL03 - Pathanamthitta", city: "Pathanamthitta" },
    { value: "KL04", label: "KL04 - Alappuzha", city: "Alappuzha" },
    { value: "KL05", label: "KL05 - Kottayam", city: "Kottayam" },
    { value: "KL06", label: "KL06 - Idukki", city: "Idukki" },
    { value: "KL07", label: "KL07 - Ernakulam", city: "Ernakulam" },
    { value: "KL08", label: "KL08 - Thrissur", city: "Thrissur" },
    { value: "KL09", label: "KL09 - Palakkad", city: "Palakkad" },
    { value: "KL10", label: "KL10 - Malappuram", city: "Malappuram" },
    { value: "KL11", label: "KL11 - Kozhikode", city: "Kozhikode" },
    { value: "KL12", label: "KL12 - Wayanad", city: "Wayanad" },
    { value: "KL13", label: "KL13 - Kannur", city: "Kannur" },
    { value: "KL14", label: "KL14 - Kasaragod", city: "Kasaragod" },
    { value: "KL15", label: "KL15 - KSRTC", city: "Thiruvananthapuram" },
    { value: "KL16", label: "KL16 - Attingal", city: "Attingal" },
    { value: "KL17", label: "KL17 - Muvattupuzha", city: "Muvattupuzha" },
    { value: "KL18", label: "KL18 - Vadakara", city: "Vadakara" },
    { value: "KL19", label: "KL19 - Parassala", city: "Parassala" },
    { value: "KL20", label: "KL20 - Neyyattinkara", city: "Neyyattinkara" },
    { value: "KL21", label: "KL21 - Nedumangad", city: "Nedumangad" },
    { value: "KL22", label: "KL22 - Kazhakuttom", city: "Kazhakuttom" },
    { value: "KL23", label: "KL23 - Karunagappally", city: "Karunagappally" },
    { value: "KL24", label: "KL24 - Kottarakkara", city: "Kottarakkara" },
    { value: "KL25", label: "KL25 - Punalur", city: "Punalur" },
    { value: "KL26", label: "KL26 - Adoor", city: "Adoor" },
    { value: "KL27", label: "KL27 - Thiruvalla", city: "Thiruvalla" },
    { value: "KL28", label: "KL28 - Mallappally", city: "Mallappally" },
    { value: "KL29", label: "KL29 - Kayamkulam", city: "Kayamkulam" },
    { value: "KL30", label: "KL30 - Chengannur", city: "Chengannur" },
    { value: "KL31", label: "KL31 - Mavelikkara", city: "Mavelikkara" },
    { value: "KL32", label: "KL32 - Cherthala", city: "Cherthala" },
    { value: "KL33", label: "KL33 - Changanassery", city: "Changanassery" },
    { value: "KL34", label: "KL34 - Kanjirappally", city: "Kanjirappally" },
    { value: "KL35", label: "KL35 - Pala", city: "Pala" },
    { value: "KL36", label: "KL36 - Vaikom", city: "Vaikom" },
    { value: "KL37", label: "KL37 - Vandiperiyar", city: "Vandiperiyar" },
    { value: "KL38", label: "KL38 - Thodupuzha", city: "Thodupuzha" },
    { value: "KL39", label: "KL39 - Thripunithura", city: "Thripunithura" },
    { value: "KL40", label: "KL40 - Perumbavoor", city: "Perumbavoor" },
    { value: "KL41", label: "KL41 - Aluva", city: "Aluva" },
    { value: "KL42", label: "KL42 - North Paravur", city: "North Paravur" },
    { value: "KL43", label: "KL43 - Mattancherry", city: "Mattancherry" },
    { value: "KL44", label: "KL44 - Kothamangalam", city: "Kothamangalam" },
    { value: "KL45", label: "KL45 - Irinjalakuda", city: "Irinjalakuda" },
    { value: "KL46", label: "KL46 - Guruvayur", city: "Guruvayur" },
    { value: "KL47", label: "KL47 - Kodungalloor", city: "Kodungalloor" },
    { value: "KL48", label: "KL48 - Wadakkanchery", city: "Wadakkanchery" },
    { value: "KL49", label: "KL49 - Alathur", city: "Alathur" },
    { value: "KL50", label: "KL50 - Mannarkkad", city: "Mannarkkad" },
    { value: "KL51", label: "KL51 - Ottappalam", city: "Ottappalam" },
    { value: "KL52", label: "KL52 - Pattambi", city: "Pattambi" },
    { value: "KL53", label: "KL53 - Perinthalmanna", city: "Perinthalmanna" },
    { value: "KL54", label: "KL54 - Ponnani", city: "Ponnani" },
    { value: "KL55", label: "KL55 - Tirur", city: "Tirur" },
    { value: "KL56", label: "KL56 - Koyilandy", city: "Koyilandy" },
    { value: "KL57", label: "KL57 - Koduvally", city: "Koduvally" },
    { value: "KL58", label: "KL58 - Thalassery", city: "Thalassery" },
    { value: "KL59", label: "KL59 - Thaliparamba", city: "Thaliparamba" },
    { value: "KL60", label: "KL60 - Kanhangad", city: "Kanhangad" },
    { value: "KL61", label: "KL61 - Kunnathur", city: "Kunnathur" },
    { value: "KL62", label: "KL62 - Ranni", city: "Ranni" },
    { value: "KL63", label: "KL63 - Angamaly", city: "Angamaly" },
    { value: "KL64", label: "KL64 - Chalakudy", city: "Chalakudy" },
    { value: "KL65", label: "KL65 - Tirurangadi", city: "Tirurangadi" },
    { value: "KL66", label: "KL66 - Kuttanadu", city: "Kuttanadu" },
    { value: "KL67", label: "KL67 - Uzhavoor", city: "Uzhavoor" },
    { value: "KL68", label: "KL68 - Devikulam", city: "Devikulam" },
    { value: "KL69", label: "KL69 - Udumbanchola", city: "Udumbanchola" },
    { value: "KL70", label: "KL70 - Chittur", city: "Chittur" },
    { value: "KL71", label: "KL71 - Nilambur", city: "Nilambur" },
    { value: "KL72", label: "KL72 - Mananthavady", city: "Mananthavady" },
    { value: "KL73", label: "KL73 - Sulthan Bathery", city: "Sulthan Bathery" },
    { value: "KL74", label: "KL74 - Kattakkada", city: "Kattakkada" },
    { value: "KL75", label: "KL75 - Thriprayar", city: "Thriprayar" },
    { value: "KL76", label: "KL76 - Nanmanda", city: "Nanmanda" },
    { value: "KL77", label: "KL77 - Perambra", city: "Perambra" },
    { value: "KL78", label: "KL78 - Iritty", city: "Iritty" },
    { value: "KL79", label: "KL79 - Vellarikundu", city: "Vellarikundu" },
    { value: "KL80", label: "KL80 - Pathanapuram", city: "Pathanapuram" },
    { value: "KL81", label: "KL81 - Varkala", city: "Varkala" },
    { value: "KL82", label: "KL82 - Chadayamangalam", city: "Chadayamangalam" },
    { value: "KL83", label: "KL83 - Konni", city: "Konni" },
    { value: "KL84", label: "KL84 - Kondotty", city: "Kondotty" },
    { value: "KL85", label: "KL85 - Ramanattukara", city: "Ramanattukara" },
    { value: "KL86", label: "KL86 - Payyannur", city: "Payyannur" },
    { value: "KL90", label: "KL90 - Government Vehicles", city: "Thiruvananthapuram" },

    // Telangana
    { value: "TS01", label: "TS01 - Adilabad", city: "Adilabad" },
    { value: "TS02", label: "TS02 - Karimnagar", city: "Karimnagar" },
    { value: "TS03", label: "TS03 - Warangal Urban", city: "Warangal" },
    { value: "TS04", label: "TS04 - Khammam", city: "Khammam" },
    { value: "TS05", label: "TS05 - Nalgonda", city: "Nalgonda" },
    { value: "TS06", label: "TS06 - Mahbubnagar", city: "Mahbubnagar" },
    { value: "TS07", label: "TS07 - Ranga Reddy", city: "Hyderabad" },
    { value: "TS08", label: "TS08 - Medchal-Malkajgiri", city: "Medchal" },
    { value: "TS09", label: "TS09 - Hyderabad Central", city: "Hyderabad" },
    { value: "TS10", label: "TS10 - Hyderabad North", city: "Hyderabad" },
    { value: "TS11", label: "TS11 - Hyderabad East", city: "Hyderabad" },
    { value: "TS12", label: "TS12 - Hyderabad South", city: "Hyderabad" },
    { value: "TS13", label: "TS13 - Hyderabad West", city: "Hyderabad" },
    { value: "TS14", label: "TS14 - Reserved Hyderabad", city: "Hyderabad" },
    { value: "TS15", label: "TS15 - Sangareddy", city: "Sangareddy" },
    { value: "TS16", label: "TS16 - Nizamabad", city: "Nizamabad" },
    { value: "TS17", label: "TS17 - Kamareddy", city: "Kamareddy" },
    { value: "TS18", label: "TS18 - Nirmal", city: "Nirmal" },
    { value: "TS19", label: "TS19 - Mancherial", city: "Mancherial" },
    { value: "TS20", label: "TS20 - Kumaram Bheem Asifabad", city: "Asifabad" },
    { value: "TS21", label: "TS21 - Jagtial", city: "Jagtial" },
    { value: "TS22", label: "TS22 - Peddapalli", city: "Peddapalli" },
    { value: "TS23", label: "TS23 - Sircilla", city: "Sircilla" },
    { value: "TS24", label: "TS24 - Warangal Rural", city: "Warangal" },
    { value: "TS25", label: "TS25 - Jayashankar Bhupalpally", city: "Bhupalpally" },
    { value: "TS26", label: "TS26 - Mahabubabad", city: "Mahabubabad" },
    { value: "TS27", label: "TS27 - Jangaon", city: "Jangaon" },
    { value: "TS28", label: "TS28 - Bhadradri Kothagudem", city: "Kothagudem" },
    { value: "TS29", label: "TS29 - Suryapet", city: "Suryapet" },
    { value: "TS30", label: "TS30 - Yadadri Bhuvanagiri", city: "Bhuvanagiri" },
    { value: "TS31", label: "TS31 - Nagarkurnool", city: "Nagarkurnool" },
    { value: "TS32", label: "TS32 - Wanaparthy", city: "Wanaparthy" },
    { value: "TS33", label: "TS33 - Jogulamba Gadwal", city: "Gadwal" },
    { value: "TS34", label: "TS34 - Vikarabad", city: "Vikarabad" },
    { value: "TS35", label: "TS35 - Medak", city: "Medak" },
    { value: "TS36", label: "TS36 - Siddipet", city: "Siddipet" },

    // Odisha
    { value: "OD01", label: "OD01 - Balasore", city: "Balasore" },
    { value: "OD02", label: "OD02 - Bhubaneswar", city: "Bhubaneswar" },
    { value: "OD03", label: "OD03 - Bolangir", city: "Bolangir" },
    { value: "OD04", label: "OD04 - Chandikhol", city: "Chandikhol" },
    { value: "OD05", label: "OD05 - Cuttack", city: "Cuttack" },
    { value: "OD06", label: "OD06 - Dhenkanal", city: "Dhenkanal" },
    { value: "OD07", label: "OD07 - Ganjam", city: "Brahmapur" },
    { value: "OD08", label: "OD08 - Kalahandi", city: "Bhawanipatna" },
    { value: "OD09", label: "OD09 - Keonjhar", city: "Keonjhar" },
    { value: "OD10", label: "OD10 - Koraput", city: "Koraput" },
    { value: "OD11", label: "OD11 - Mayurbhanj", city: "Baripada" },
    { value: "OD12", label: "OD12 - Phulbani", city: "Phulbani" },
    { value: "OD13", label: "OD13 - Puri", city: "Puri" },
    { value: "OD14", label: "OD14 - Rourkela", city: "Rourkela" },
    { value: "OD15", label: "OD15 - Sambalpur", city: "Sambalpur" },
    { value: "OD16", label: "OD16 - Sundergarh", city: "Sundergarh" },
    { value: "OD17", label: "OD17 - Bargarh", city: "Bargarh" },
    { value: "OD18", label: "OD18 - Rayagada", city: "Rayagada" },
    { value: "OD19", label: "OD19 - Angul", city: "Angul" },
    { value: "OD20", label: "OD20 - Gajapati", city: "Paralakhemundi" },
    { value: "OD21", label: "OD21 - Jagatsinghpur", city: "Jagatsinghpur" },
    { value: "OD22", label: "OD22 - Bhadrak", city: "Bhadrak" },
    { value: "OD23", label: "OD23 - Jharsuguda", city: "Jharsuguda" },
    { value: "OD24", label: "OD24 - Nabarangpur", city: "Nabarangpur" },
    { value: "OD25", label: "OD25 - Nayagarh", city: "Nayagarh" },
    { value: "OD26", label: "OD26 - Nuapada", city: "Nuapada" },
    { value: "OD27", label: "OD27 - Boudh", city: "Boudh" },
    { value: "OD28", label: "OD28 - Debagarh", city: "Debagarh" },
    { value: "OD29", label: "OD29 - Kendrapara", city: "Kendrapara" },
    { value: "OD30", label: "OD30 - Malkangiri", city: "Malkangiri" },
    { value: "OD31", label: "OD31 - Sonepur", city: "Sonepur" },
    { value: "OD32", label: "OD32 - Bhanjanagar", city: "Bhanjanagar" },
    { value: "OD33", label: "OD33 - Bhubaneswar-II", city: "Bhubaneswar" },
    { value: "OD34", label: "OD34 - Jajpur", city: "Jajpur" },
    { value: "OD35", label: "OD35 - Talcher", city: "Talcher" },

    // Jharkhand
    { value: "JH01", label: "JH01 - Ranchi", city: "Ranchi" },
    { value: "JH02", label: "JH02 - Hazaribagh", city: "Hazaribagh" },
    { value: "JH03", label: "JH03 - Daltonganj", city: "Daltonganj" },
    { value: "JH04", label: "JH04 - Dumka", city: "Dumka" },
    { value: "JH05", label: "JH05 - Jamshedpur", city: "Jamshedpur" },
    { value: "JH06", label: "JH06 - Chaibasa", city: "Chaibasa" },
    { value: "JH07", label: "JH07 - Gumla", city: "Gumla" },
    { value: "JH08", label: "JH08 - Lohardaga", city: "Lohardaga" },
    { value: "JH09", label: "JH09 - Bokaro Steel City", city: "Bokaro" },
    { value: "JH10", label: "JH10 - Dhanbad", city: "Dhanbad" },
    { value: "JH11", label: "JH11 - Giridih", city: "Giridih" },
    { value: "JH12", label: "JH12 - Koderma", city: "Koderma" },
    { value: "JH13", label: "JH13 - Chatra", city: "Chatra" },
    { value: "JH14", label: "JH14 - Garhwa", city: "Garhwa" },
    { value: "JH15", label: "JH15 - Deoghar", city: "Deoghar" },
    { value: "JH16", label: "JH16 - Pakur", city: "Pakur" },
    { value: "JH17", label: "JH17 - Godda", city: "Godda" },
    { value: "JH18", label: "JH18 - Sahibganj", city: "Sahibganj" },
    { value: "JH19", label: "JH19 - Latehar", city: "Latehar" },
    { value: "JH20", label: "JH20 - Simdega", city: "Simdega" },
    { value: "JH21", label: "JH21 - Jamtara", city: "Jamtara" },
    { value: "JH22", label: "JH22 - Saraikela-Kharsawan", city: "Saraikela" },
    { value: "JH23", label: "JH23 - Khunti", city: "Khunti" },
    { value: "JH24", label: "JH24 - Ramgarh", city: "Ramgarh" },

    // Assam
    { value: "AS01", label: "AS01 - Guwahati", city: "Guwahati" },
    { value: "AS02", label: "AS02 - Nagaon", city: "Nagaon" },
    { value: "AS03", label: "AS03 - Jorhat", city: "Jorhat" },
    { value: "AS04", label: "AS04 - Sivasagar", city: "Sivasagar" },
    { value: "AS05", label: "AS05 - Golaghat", city: "Golaghat" },
    { value: "AS06", label: "AS06 - Dibrugarh", city: "Dibrugarh" },
    { value: "AS07", label: "AS07 - Lakhimpur", city: "Lakhimpur" },
    { value: "AS08", label: "AS08 - Haflong", city: "Haflong" },
    { value: "AS09", label: "AS09 - Diphu", city: "Diphu" },
    { value: "AS10", label: "AS10 - Karimganj", city: "Karimganj" },
    { value: "AS11", label: "AS11 - Silchar", city: "Silchar" },
    { value: "AS12", label: "AS12 - Tezpur", city: "Tezpur" },
    { value: "AS13", label: "AS13 - Mangaldoi", city: "Mangaldoi" },
    { value: "AS14", label: "AS14 - Nalbari", city: "Nalbari" },
    { value: "AS15", label: "AS15 - Barpeta", city: "Barpeta" },
    { value: "AS16", label: "AS16 - Kokrajhar", city: "Kokrajhar" },
    { value: "AS17", label: "AS17 - Dhubri", city: "Dhubri" },
    { value: "AS18", label: "AS18 - Goalpara", city: "Goalpara" },
    { value: "AS19", label: "AS19 - Bongaigaon", city: "Bongaigaon" },
    { value: "AS21", label: "AS21 - Morigaon", city: "Morigaon" },
    { value: "AS22", label: "AS22 - Dhemaji", city: "Dhemaji" },
    { value: "AS23", label: "AS23 - Tinsukia", city: "Tinsukia" },
    { value: "AS24", label: "AS24 - Hailakandi", city: "Hailakandi" },
    { value: "AS25", label: "AS25 - Kamrup Rural", city: "Kamrup" },
    { value: "AS26", label: "AS26 - Chirang", city: "Chirang" },
    { value: "AS27", label: "AS27 - Udalguri", city: "Udalguri" },
    { value: "AS28", label: "AS28 - Baksa", city: "Baksa" },
    { value: "AS29", label: "AS29 - Majuli", city: "Majuli" },
    { value: "AS31", label: "AS31 - Hojai", city: "Hojai" },
    { value: "AS32", label: "AS32 - Biswanath Chariali", city: "Biswanath Chariali" },
    { value: "AS33", label: "AS33 - Charaideo", city: "Charaideo" },
    { value: "AS34", label: "AS34 - South Salmara–Mankachar", city: "South Salmara" },

    // Chhattisgarh
    { value: "CG01", label: "CG01 - Governor's Vehicle", city: "Raipur" },
    { value: "CG02", label: "CG02 - Government Vehicles", city: "Raipur" },
    { value: "CG03", label: "CG03 - Police Vehicles", city: "Raipur" },
    { value: "CG04", label: "CG04 - Raipur", city: "Raipur" },
    { value: "CG05", label: "CG05 - Dhamtari", city: "Dhamtari" },
    { value: "CG06", label: "CG06 - Mahasamund", city: "Mahasamund" },
    { value: "CG07", label: "CG07 - Durg", city: "Durg" },
    { value: "CG08", label: "CG08 - Rajnandgaon", city: "Rajnandgaon" },
    { value: "CG09", label: "CG09 - Kawardha", city: "Kawardha" },
    { value: "CG10", label: "CG10 - Bilaspur", city: "Bilaspur" },
    { value: "CG11", label: "CG11 - Janjgir-Champa", city: "Janjgir" },
    { value: "CG12", label: "CG12 - Korba", city: "Korba" },
    { value: "CG13", label: "CG13 - Raigarh", city: "Raigarh" },
    { value: "CG14", label: "CG14 - Jashpur", city: "Jashpur" },
    { value: "CG15", label: "CG15 - Ambikapur", city: "Ambikapur" },
    { value: "CG16", label: "CG16 - Baikunthpur", city: "Baikunthpur" },
    { value: "CG17", label: "CG17 - Jagdalpur", city: "Jagdalpur" },
    { value: "CG18", label: "CG18 - Dantewada", city: "Dantewada" },
    { value: "CG19", label: "CG19 - Kanker", city: "Kanker" },
    { value: "CG20", label: "CG20 - Bijapur", city: "Bijapur" },
    { value: "CG21", label: "CG21 - Narayanpur", city: "Narayanpur" },
    { value: "CG22", label: "CG22 - Baloda Bazar", city: "Baloda Bazar" },
    { value: "CG23", label: "CG23 - Gariaband", city: "Gariaband" },
    { value: "CG24", label: "CG24 - Balod", city: "Balod" },
    { value: "CG25", label: "CG25 - Bemetara", city: "Bemetara" },
    { value: "CG26", label: "CG26 - Sukma", city: "Sukma" },
    { value: "CG27", label: "CG27 - Kondagaon", city: "Kondagaon" },
    { value: "CG28", label: "CG28 - Mungeli", city: "Mungeli" },
    { value: "CG29", label: "CG29 - Surajpur", city: "Surajpur" },
    { value: "CG30", label: "CG30 - Balrampur", city: "Balrampur" },
    { value: "CG31", label: "CG31 - Gaurela-Pendra-Marwahi", city: "Gaurela" },
    { value: "CG99", label: "CG99 - State Transport Authority", city: "Raipur" },

    // Uttarakhand
    { value: "UK01", label: "UK01 - Almora", city: "Almora" },
    { value: "UK02", label: "UK02 - Bageshwar", city: "Bageshwar" },
    { value: "UK03", label: "UK03 - Champawat", city: "Champawat" },
    { value: "UK04", label: "UK04 - Nainital", city: "Haldwani" },
    { value: "UK05", label: "UK05 - Pithoragarh", city: "Pithoragarh" },
    { value: "UK06", label: "UK06 - Udham Singh Nagar", city: "Rudrapur" },
    { value: "UK07", label: "UK07 - Dehradun", city: "Dehradun" },
    { value: "UK08", label: "UK08 - Haridwar", city: "Haridwar" },
    { value: "UK09", label: "UK09 - Tehri Garhwal", city: "Tehri" },
    { value: "UK10", label: "UK10 - Uttarkashi", city: "Uttarkashi" },
    { value: "UK11", label: "UK11 - Chamoli", city: "Gopeshwar" },
    { value: "UK12", label: "UK12 - Pauri Garhwal", city: "Pauri" },
    { value: "UK13", label: "UK13 - Rudraprayag", city: "Rudraprayag" },
    { value: "UK14", label: "UK14 - Rishikesh", city: "Rishikesh" },
    { value: "UK15", label: "UK15 - Kotdwar", city: "Kotdwar" },
    { value: "UK16", label: "UK16 - Vikasnagar", city: "Vikasnagar" },
    { value: "UK17", label: "UK17 - Roorkee", city: "Roorkee" },
    { value: "UK18", label: "UK18 - Kashipur", city: "Kashipur" },
    { value: "UK19", label: "UK19 - Ramnagar", city: "Ramnagar" },
    { value: "UK20", label: "UK20 - Ranikhet", city: "Ranikhet" },

    // Himachal Pradesh
    { value: "HP01", label: "HP01 - Shimla Urban", city: "Shimla" },
    { value: "HP02", label: "HP02 - Shimla Tourist", city: "Shimla" },
    { value: "HP03", label: "HP03 - Shimla Taxis", city: "Shimla" },
    { value: "HP04", label: "HP04 - Dharamsala", city: "Dharamsala" },
    { value: "HP05", label: "HP05 - Mandi", city: "Mandi" },
    { value: "HP06", label: "HP06 - Rampur Bushahr", city: "Rampur" },
    { value: "HP07", label: "HP07 - Shimla Commercial", city: "Shimla" },
    { value: "HP08", label: "HP08 - Chaupal", city: "Chaupal" },
    { value: "HP09", label: "HP09 - Theog", city: "Theog" },
    { value: "HP10", label: "HP10 - Rohru", city: "Rohru" },
    { value: "HP11", label: "HP11 - Arki", city: "Arki" },
    { value: "HP12", label: "HP12 - Nalagarh", city: "Nalagarh" },
    { value: "HP13", label: "HP13 - Kandaghat", city: "Kandaghat" },
    { value: "HP14", label: "HP14 - Solan", city: "Solan" },
    { value: "HP15", label: "HP15 - Parwanoo", city: "Parwanoo" },
    { value: "HP16", label: "HP16 - Rajgarh", city: "Rajgarh" },
    { value: "HP17", label: "HP17 - Paonta Sahib", city: "Paonta Sahib" },
    { value: "HP18", label: "HP18 - Nahan", city: "Nahan" },
    { value: "HP19", label: "HP19 - Amb", city: "Amb" },
    { value: "HP20", label: "HP20 - Una", city: "Una" },
    { value: "HP21", label: "HP21 - Barsar", city: "Barsar" },
    { value: "HP22", label: "HP22 - Hamirpur", city: "Hamirpur" },
    { value: "HP23", label: "HP23 - Ghumarwin", city: "Ghumarwin" },
    { value: "HP24", label: "HP24 - Bilaspur", city: "Bilaspur" },
    { value: "HP25", label: "HP25 - Kalpa", city: "Kalpa" },
    { value: "HP26", label: "HP26 - Nichar", city: "Nichar" },
    { value: "HP27", label: "HP27 - Pooh", city: "Pooh" },
    { value: "HP28", label: "HP28 - Sarkaghat", city: "Sarkaghat" },
    { value: "HP29", label: "HP29 - Jogindernagar", city: "Jogindernagar" },
    { value: "HP30", label: "HP30 - Karsog", city: "Karsog" },
    { value: "HP31", label: "HP31 - Sundernagar", city: "Sundernagar" },
    { value: "HP32", label: "HP32 - Gohar", city: "Gohar" },
    { value: "HP34", label: "HP34 - Kullu", city: "Kullu" },
    { value: "HP37", label: "HP37 - Palampur", city: "Palampur" },
    { value: "HP38", label: "HP38 - Nurpur", city: "Nurpur" },
    { value: "HP40", label: "HP40 - Kangra", city: "Kangra" },
    { value: "HP42", label: "HP42 - Keylong", city: "Keylong" },
    { value: "HP48", label: "HP48 - Chamba", city: "Chamba" },
    { value: "HP49", label: "HP49 - Banjar", city: "Banjar" },
    { value: "HP50", label: "HP50 - Shimla Rural", city: "Shimla" },
    { value: "HP51", label: "HP51 - Shimla Rural", city: "Shimla" },
    { value: "HP52", label: "HP52 - Shimla Rural", city: "Shimla" },
    { value: "HP53", label: "HP53 - Baijnath", city: "Baijnath" },
    { value: "HP55", label: "HP55 - Nadaun", city: "Nadaun" },
    { value: "HP58", label: "HP58 - Manali", city: "Manali" },
    { value: "HP59", label: "HP59 - Baddi", city: "Baddi" },
    { value: "HP64", label: "HP64 - Solan Arki", city: "Solan" },
    { value: "HP67", label: "HP67 - Hamirpur Additional", city: "Hamirpur" },
    { value: "HP72", label: "HP72 - Haroli", city: "Haroli" },
    { value: "HP77", label: "HP77 - Dodra Kawar", city: "Dodra Kawar" },
    { value: "HP80", label: "HP80 - Haroli", city: "Haroli" },
    { value: "HP81", label: "HP81 - Salooni", city: "Salooni" },
    { value: "HP84", label: "HP84 - Sujanpur", city: "Sujanpur" },
    { value: "HP91", label: "HP91 - Naina Devi", city: "Naina Devi" },
    { value: "HP93", label: "HP93 - Nalagarh Industrial", city: "Nalagarh" },
    { value: "HP94", label: "HP94 - Nagrota Bagwan", city: "Nagrota Bagwan" },
    { value: "HP95", label: "HP95 - Kumarsain", city: "Kumarsain" },
    { value: "HP98", label: "HP98 - Kasauli", city: "Kasauli" },
    { value: "HP99", label: "HP99 - Kotkhai", city: "Kotkhai" },

    // Jammu & Kashmir
    { value: "JK01", label: "JK01 - Srinagar", city: "Srinagar" },
    { value: "JK02", label: "JK02 - Jammu", city: "Jammu" },
    { value: "JK03", label: "JK03 - Anantnag", city: "Anantnag" },
    { value: "JK04", label: "JK04 - Budgam", city: "Budgam" },
    { value: "JK05", label: "JK05 - Baramulla", city: "Baramulla" },
    { value: "JK06", label: "JK06 - Doda", city: "Doda" },
    { value: "JK07", label: "JK07 - Kargil", city: "Kargil" },
    { value: "JK08", label: "JK08 - Kathua", city: "Kathua" },
    { value: "JK09", label: "JK09 - Kulgam", city: "Kulgam" },
    { value: "JK10", label: "JK10 - Kupwara", city: "Kupwara" },
    { value: "JK11", label: "JK11 - Leh", city: "Leh" },
    { value: "JK12", label: "JK12 - Poonch", city: "Poonch" },
    { value: "JK13", label: "JK13 - Pulwama", city: "Pulwama" },
    { value: "JK14", label: "JK14 - Rajouri", city: "Rajouri" },
    { value: "JK15", label: "JK15 - Ramban", city: "Ramban" },
    { value: "JK16", label: "JK16 - Reasi", city: "Reasi" },
    { value: "JK17", label: "JK17 - Samba", city: "Samba" },
    { value: "JK18", label: "JK18 - Shopian", city: "Shopian" },
    { value: "JK19", label: "JK19 - Udhampur", city: "Udhampur" },

    // Goa
    { value: "GA01", label: "GA01 - Panaji", city: "Panaji" },
    { value: "GA02", label: "GA02 - Margao", city: "Margao" },
    { value: "GA03", label: "GA03 - Mapusa", city: "Mapusa" },
    { value: "GA04", label: "GA04 - Bicholim", city: "Bicholim" },
    { value: "GA05", label: "GA05 - Ponda", city: "Ponda" },
    { value: "GA06", label: "GA06 - Vasco da Gama", city: "Vasco da Gama" },
    { value: "GA07", label: "GA07 - Panaji Additional", city: "Panaji" },
    { value: "GA08", label: "GA08 - Margao Additional", city: "Margao" },
    { value: "GA09", label: "GA09 - Quepem", city: "Quepem" },
    { value: "GA10", label: "GA10 - Canacona", city: "Canacona" },
    { value: "GA11", label: "GA11 - Pernem", city: "Pernem" },
    { value: "GA12", label: "GA12 - Dharbandora", city: "Dharbandora" },

    // Northeastern States
    { value: "MN01", label: "MN01 - Imphal West", city: "Imphal" },
    { value: "MN02", label: "MN02 - Churachandpur", city: "Churachandpur" },
    { value: "MN03", label: "MN03 - Kangpokpi", city: "Kangpokpi" },
    { value: "MN04", label: "MN04 - Thoubal", city: "Thoubal" },
    { value: "MN05", label: "MN05 - Bishnupur", city: "Bishnupur" },
    { value: "MN06", label: "MN06 - Imphal East", city: "Imphal" },
    { value: "MN07", label: "MN07 - Ukhrul", city: "Ukhrul" },

    { value: "ML01", label: "ML01 - Shillong", city: "Shillong" },
    { value: "ML02", label: "ML02 - Shillong", city: "Shillong" },
    { value: "ML03", label: "ML03 - Shillong", city: "Shillong" },
    { value: "ML04", label: "ML04 - Jowai", city: "Jowai" },
    { value: "ML05", label: "ML05 - Shillong", city: "Shillong" },
    { value: "ML06", label: "ML06 - Nongstoin", city: "Nongstoin" },
    { value: "ML07", label: "ML07 - Williamnagar", city: "Williamnagar" },
    { value: "ML08", label: "ML08 - Tura", city: "Tura" },
    { value: "ML09", label: "ML09 - Baghmara", city: "Baghmara" },
    { value: "ML10", label: "ML10 - Nongpoh", city: "Nongpoh" },
    { value: "ML11", label: "ML11 - Khliehriat", city: "Khliehriat" },
    { value: "ML12", label: "ML12 - Mawkyrwat", city: "Mawkyrwat" },
    { value: "ML13", label: "ML13 - Resubelpara", city: "Resubelpara" },
    { value: "ML14", label: "ML14 - Ampati", city: "Ampati" },
    { value: "ML15", label: "ML15 - Mairang", city: "Mairang" },

    { value: "MZ01", label: "MZ01 - Aizawl", city: "Aizawl" },
    { value: "MZ02", label: "MZ02 - Lunglei", city: "Lunglei" },
    { value: "MZ03", label: "MZ03 - Saiha", city: "Saiha" },
    { value: "MZ04", label: "MZ04 - Champhai", city: "Champhai" },
    { value: "MZ05", label: "MZ05 - Kolasib", city: "Kolasib" },
    { value: "MZ06", label: "MZ06 - Serchhip", city: "Serchhip" },
    { value: "MZ07", label: "MZ07 - Lawngtlai", city: "Lawngtlai" },
    { value: "MZ08", label: "MZ08 - Mamit", city: "Mamit" },
    { value: "MZ09", label: "MZ09 - Aizawl Rural", city: "Aizawl" },

    { value: "NL01", label: "NL01 - Kohima", city: "Kohima" },
    { value: "NL02", label: "NL02 - Mokokchung", city: "Mokokchung" },
    { value: "NL03", label: "NL03 - Tuensang", city: "Tuensang" },
    { value: "NL04", label: "NL04 - Mon", city: "Mon" },
    { value: "NL05", label: "NL05 - Wokha", city: "Wokha" },
    { value: "NL06", label: "NL06 - Zunheboto", city: "Zunheboto" },
    { value: "NL07", label: "NL07 - Dimapur", city: "Dimapur" },
    { value: "NL08", label: "NL08 - Phek", city: "Phek" },
    { value: "NL09", label: "NL09 - Kiphire", city: "Kiphire" },
    { value: "NL10", label: "NL10 - Kohima", city: "Kohima" },
    { value: "NL11", label: "NL11 - Kohima", city: "Kohima" },

    { value: "TR01", label: "TR01 - Agartala", city: "Agartala" },
    { value: "TR02", label: "TR02 - Kailashahar", city: "Kailashahar" },
    { value: "TR03", label: "TR03 - Udaipur", city: "Udaipur" },
    { value: "TR04", label: "TR04 - Dharmanagar", city: "Dharmanagar" },
    { value: "TR05", label: "TR05 - Ambassa", city: "Ambassa" },
    { value: "TR06", label: "TR06 - Khowai", city: "Khowai" },
    { value: "TR07", label: "TR07 - Belonia", city: "Belonia" },
    { value: "TR08", label: "TR08 - Teliamura", city: "Teliamura" },
    { value: "TR99", label: "TR99 - STA Tripura", city: "Agartala" },

    { value: "SK01", label: "SK01 - Gangtok", city: "Gangtok" },
    { value: "SK02", label: "SK02 - Gyalshing", city: "Gyalshing" },
    { value: "SK03", label: "SK03 - Mangan", city: "Mangan" },
    { value: "SK04", label: "SK04 - Jorethang", city: "Jorethang" },
    { value: "SK05", label: "SK05 - Namchi", city: "Namchi" },
    { value: "SK06", label: "SK06 - Soreng", city: "Soreng" },
    { value: "SK07", label: "SK07 - Pakyong", city: "Pakyong" },
    { value: "SK08", label: "SK08 - Singtam", city: "Singtam" },

    // Union Territories
    { value: "AN01", label: "AN01 - Port Blair", city: "Port Blair" },
    { value: "AN02", label: "AN02 - Car Nicobar", city: "Car Nicobar" },

    { value: "CH01", label: "CH01 - Chandigarh", city: "Chandigarh" },
    { value: "CH02", label: "CH02 - Chandigarh", city: "Chandigarh" },
    { value: "CH03", label: "CH03 - Chandigarh", city: "Chandigarh" },
    { value: "CH04", label: "CH04 - Chandigarh", city: "Chandigarh" },

    { value: "DN01", label: "DN01 - Daman", city: "Daman" },
    { value: "DD01", label: "DD01 - Diu", city: "Diu" },

    { value: "LD01", label: "LD01 - Kavaratti", city: "Kavaratti" },

    { value: "PY01", label: "PY01 - Puducherry", city: "Puducherry" },
    { value: "PY02", label: "PY02 - Karaikal", city: "Karaikal" },
    { value: "PY03", label: "PY03 - Mahe", city: "Mahe" },
    { value: "PY04", label: "PY04 - Yanam", city: "Yanam" },

    // Ladakh
    { value: "LA01", label: "LA01 - Leh", city: "Leh" },
    { value: "LA02", label: "LA02 - Kargil", city: "Kargil" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    // 🏙️ Auto-fill vehicle city when district changes
    if (name === "vehicleDistrict") {
      const selected = districtOptions.find(
        (d) => d.value.toLowerCase() === value.toLowerCase()
      );
      setFormData({
        ...formData,
        vehicleDistrict: value.toUpperCase(),
        vehicleCity: selected ? selected.city : "",
      });
      setErrors({
        ...errors,
        vehicleDistrict: selected ? "" : "Invalid district code.",
      });
      return;
    }

    // 🚘 Auto-update cost when vehicleName or trip changes
    if (name === "vehicleName" || name === "trip") {
      const updatedForm = { ...formData, [name]: value };
      const baseRate = tollBaseRates[updatedForm.vehicleName] || 0;
      const gstAmount = baseRate * 0.18;
      const total = baseRate + gstAmount;
      const tripMultiplier = updatedForm.trip === "Two Way" ? 2 : 1;
      const finalCost = total * tripMultiplier;

      setFormData({
        ...updatedForm,
        baseCost: baseRate ? baseRate.toFixed(2) : "",
        gst: gstAmount ? gstAmount.toFixed(2) : "",
        cost: finalCost ? finalCost.toFixed(2) : "",
      });
      setErrors({ ...errors, [name]: "" });
      return;
    }

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // ✅ Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.vehicleCategory) newErrors.vehicleCategory = "Vehicle category is required.";
    if (!formData.laneName) newErrors.laneName = "Lane name is required.";
    if (!formData.vehicleName) newErrors.vehicleName = "Vehicle name is required.";
    if (!formData.ownerName.trim()) newErrors.ownerName = "Owner name is required.";
    if (!formData.vehicleDistrict) newErrors.vehicleDistrict = "District code is required.";
    if (!formData.vehicleSeriesNumber.trim()) newErrors.vehicleSeriesNumber = "Series + number is required.";
    if (!formData.vehicleCity.trim()) newErrors.vehicleCity = "Vehicle city is required.";
    if (!formData.trip) newErrors.trip = "Trip is required.";
    if (!formData.cost) newErrors.cost = "Cost is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 💾 Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const existingReceipts = JSON.parse(localStorage.getItem("receiptData")) || [];
      const newId =
        existingReceipts.length > 0
          ? existingReceipts[existingReceipts.length - 1].id + 1
          : 1;

      const receiptId = Date.now().toString();
      const dateOfCreation = new Date().toISOString().slice(0, 19).replace("T", " ");
      const fullVehicleNumber = `${formData.vehicleDistrict} ${formData.vehicleSeriesNumber.toUpperCase()}`;

      const receiptToSave = {
        id: newId,
        receiptId,
        dateOfCreation,
        ...formData,
        fullVehicleNumber,
      };

      localStorage.setItem("receiptData", JSON.stringify([...existingReceipts, receiptToSave]));
      alert("✅ Receipt added successfully!");

      setFormData({
        vehicleCategory: "",
        laneName: "",
        vehicleName: "",
        ownerName: "",
        vehicleDistrict: "",
        vehicleSeriesNumber: "",
        vehicleCity: "",
        trip: "",
        baseCost: "",
        gst: "",
        cost: "",
      });
    } else {
      alert("❌ Please fill all required fields correctly!");
    }
  };

  const formattedPlate =
    formData.vehicleDistrict && formData.vehicleSeriesNumber
      ? `${formData.vehicleDistrict} ${formData.vehicleSeriesNumber.toUpperCase()}`
      : "";

  return (
    <div className="add-receipt-container">
      <div className="add-receipt-card">
        <h2 className="add-receipt-title">Add Receipt</h2>

        <form onSubmit={handleSubmit} className="add-receipt-form">
          <div className="form-grid">
            {/* Vehicle Category */}
            <div className="form-group">
              <label>Vehicle Category</label>
              <CustomSelect
                name="vehicleCategory"
                value={formData.vehicleCategory}
                onChange={handleChange}
                options={categoryOptions}
                placeholder="Choose Category"
              />
              {errors.vehicleCategory && <span className="error">{errors.vehicleCategory}</span>}
            </div>

            {/* Lane */}
            <div className="form-group">
              <label>Name of Lane</label>
              <CustomSelect
                name="laneName"
                value={formData.laneName}
                onChange={handleChange}
                options={laneOptions}
                placeholder="Choose Lane Number"
              />
              {errors.laneName && <span className="error">{errors.laneName}</span>}
            </div>

            {/* Vehicle Name */}
            <div className="form-group">
              <label>Vehicle Name</label>
              <CustomSelect
                name="vehicleName"
                value={formData.vehicleName}
                onChange={handleChange}
                options={vehicleOptions}
                placeholder="Choose Vehicle"
              />
              {errors.vehicleName && <span className="error">{errors.vehicleName}</span>}
            </div>

            {/* Owner */}
            <div className="form-group">
              <label>Owner Name</label>
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                placeholder="Enter owner name"
              />
              {errors.ownerName && <span className="error">{errors.ownerName}</span>}
            </div>

            {/* Vehicle District - Now as Dropdown */}
            <div className="form-group">
              <label>Vehicle District (Code)</label>
              <CustomSelect
                name="vehicleDistrict"
                value={formData.vehicleDistrict}
                onChange={handleChange}
                options={districtOptions}
                placeholder="Select District Code"
              />
              {errors.vehicleDistrict && <span className="error">{errors.vehicleDistrict}</span>}
            </div>

            <div className="form-group">
              <label>Series + Number</label>
              <input
                type="text"
                name="vehicleSeriesNumber"
                value={formData.vehicleSeriesNumber}
                onChange={handleChange}
                placeholder="e.g. AB1234"
              />
              {errors.vehicleSeriesNumber && <span className="error">{errors.vehicleSeriesNumber}</span>}
            </div>

            <div className="form-group">
              <label>Vehicle City</label>
              <input
                type="text"
                name="vehicleCity"
                value={formData.vehicleCity}
                readOnly
                placeholder="Auto-filled from district"
              />
              {errors.vehicleCity && <span className="error">{errors.vehicleCity}</span>}
            </div>

            {/* Trip */}
            <div className="form-group">
              <label>Trip</label>
              <CustomSelect
                name="trip"
                value={formData.trip}
                onChange={handleChange}
                options={tripOptions}
                placeholder="Choose Trip"
              />
              {errors.trip && <span className="error">{errors.trip}</span>}
            </div>

            {/* Base Cost */}
            <div className="form-group">
              <label>Base Toll (₹)</label>
              <input
                type="number"
                name="baseCost"
                value={formData.baseCost}
                readOnly
                placeholder="Base cost"
              />
            </div>

            {/* GST */}
            <div className="form-group">
              <label>GST (18%) (₹)</label>
              <input type="number" name="gst" value={formData.gst} readOnly placeholder="GST" />
            </div>

            {/* Total Cost */}
            <div className="form-group">
              <label>Total Cost (₹)</label>
              <input
                type="number"
                name="cost"
                value={formData.cost}
                readOnly
                placeholder="Auto-calculated total"
              />
              {errors.cost && <span className="error">{errors.cost}</span>}
            </div>
          </div>

          {/* Number Plate Preview */}
          {formattedPlate && (
            <div className="vehicle-plate-preview">
              <strong>Vehicle Number Plate:</strong> {formattedPlate}
            </div>
          )}

          <div className="button-group">
            <button type="submit" className="add-receipt-btn">Add Receipt</button>
          </div>
        </form>
      </div>
    </div>
  );
}