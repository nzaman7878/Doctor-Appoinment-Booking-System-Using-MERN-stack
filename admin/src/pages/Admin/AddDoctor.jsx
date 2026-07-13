import { useContext, useState } from "react";
import { assets } from "../../assets/assets.js";
import { AdminContext } from "../../context/AdminContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [available, setAvailable] = useState(true);
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) {
        return toast.error("Image Not Selected");
      }

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append("available", available);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        // Reset form
        setDocImg(null);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("1 Year");
        setFees("");
        setAbout("");
        setSpeciality("General physician");
        setDegree("");
        setAddress1("");
        setAddress2("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={onSubmitHandler} 
      className="m-5 mt-8 w-full pb-10"
    >
      <p className="mb-6 text-2xl font-bold text-[var(--text-main)]">Add Doctor</p>
      <div className="premium-card px-8 py-8 w-full max-w-4xl max-h-[80vh] overflow-y-auto shadow-sm">
        
        {/* Upload Image Section */}
        <div className="flex items-center gap-6 mb-10">
          <label htmlFor="doc-img" className="group relative cursor-pointer">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[var(--border-color)] bg-gray-50 dark:bg-[#2A2D2D] group-hover:border-[var(--color-primary)] transition-colors flex items-center justify-center shadow-sm">
              <img
                className={`object-cover ${docImg ? 'w-full h-full' : 'w-10 opacity-60 dark:invert'}`}
                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                alt="Upload"
              />
            </div>
            <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p className="text-[var(--text-main)] font-medium leading-relaxed">
            Upload doctor <br /> picture
          </p>
        </div>

        {/* Input Grid */}
        <div className="flex flex-col lg:flex-row items-start gap-10 text-[var(--text-main)]">
          {/* Column 1 */}
          <div className="w-full lg:flex-1 flex flex-col gap-5">
            <div className="flex-1 flex flex-col gap-1.5">
              <p className="text-sm font-semibold">Doctor Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border border-[var(--border-color)] bg-white dark:bg-[#2A2D2D] rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:border-[var(--color-primary-light)] focus:ring-0 transition-all text-[var(--text-main)]"
                type="text"
                placeholder="Name"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1.5">
              <p className="text-sm font-semibold">Doctor Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border border-[var(--border-color)] bg-white dark:bg-[#2A2D2D] rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:border-[var(--color-primary-light)] focus:ring-0 transition-all text-[var(--text-main)]"
                type="email"
                placeholder="Email address"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1.5">
              <p className="text-sm font-semibold">Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border border-[var(--border-color)] bg-white dark:bg-[#2A2D2D] rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:border-[var(--color-primary-light)] focus:ring-0 transition-all text-[var(--text-main)]"
                type="password"
                placeholder="Secure password"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1.5">
              <p className="text-sm font-semibold">Experience</p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="border border-[var(--border-color)] bg-white dark:bg-[#2A2D2D] rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:border-[var(--color-primary-light)] focus:ring-0 transition-all text-[var(--text-main)] cursor-pointer"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={`${i + 1} Year${i === 0 ? '' : 's'}`}>{i + 1} Year{i === 0 ? '' : 's'}</option>
                ))}
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1.5">
              <p className="text-sm font-semibold">Consultation Fees</p>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className="border border-[var(--border-color)] bg-white dark:bg-[#2A2D2D] rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:border-[var(--color-primary-light)] focus:ring-0 transition-all text-[var(--text-main)]"
                type="number"
                placeholder="Fees amount"
                required
              />
            </div>
          </div>

          {/* Column 2 */}
          <div className="w-full lg:flex-1 flex flex-col gap-5">
            <div className="flex-1 flex flex-col gap-1.5">
              <p className="text-sm font-semibold">Speciality</p>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="border border-[var(--border-color)] bg-white dark:bg-[#2A2D2D] rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:border-[var(--color-primary-light)] focus:ring-0 transition-all text-[var(--text-main)] cursor-pointer"
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1.5">
              <p className="text-sm font-semibold">Education</p>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                className="border border-[var(--border-color)] bg-white dark:bg-[#2A2D2D] rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:border-[var(--color-primary-light)] focus:ring-0 transition-all text-[var(--text-main)]"
                type="text"
                placeholder="Degrees/Certifications"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1.5">
              <p className="text-sm font-semibold">Clinic Address</p>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className="border border-[var(--border-color)] bg-white dark:bg-[#2A2D2D] rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:border-[var(--color-primary-light)] focus:ring-0 transition-all text-[var(--text-main)] mb-2"
                type="text"
                placeholder="Address Line 1"
                required
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className="border border-[var(--border-color)] bg-white dark:bg-[#2A2D2D] rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:border-[var(--color-primary-light)] focus:ring-0 transition-all text-[var(--text-main)]"
                type="text"
                placeholder="Address Line 2"
                required
              />
            </div>

            <div className="flex gap-3 items-center mt-2 bg-gray-50 dark:bg-[#2A2D2D] p-3 rounded-xl border border-[var(--border-color)]">
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={available}
                  onChange={(e) => setAvailable(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-[#313434] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[var(--color-primary)]"></div>
                <span className="ml-3 text-sm font-semibold text-[var(--text-main)]">
                  Currently Available
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-8">
          <p className="text-sm font-semibold mb-2 text-[var(--text-main)]">About Doctor</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className="w-full px-4 py-3 border border-[var(--border-color)] bg-white dark:bg-[#2A2D2D] rounded-xl outline-none focus:ring-2 focus:border-[var(--color-primary-light)] focus:ring-0 transition-all text-[var(--text-main)] resize-none"
            placeholder="Write a brief biography about the doctor..."
            rows={5}
            required
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="bg-[var(--color-primary)] text-white px-10 py-3 mt-8 font-medium rounded-xl hover:bg-[var(--color-primary-light)] transition-all"
        >
          Add Doctor
        </motion.button>
      </div>
    </motion.form>
  );
};

export default AddDoctor;
