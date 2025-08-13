import { FaUpload } from "react-icons/fa";

export default function ProfileTab({ formData, setFormData }) {
  return (
    <>
    <h2 className="text-[22px] font-semibold mb-4">My Profile</h2>
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
          className="border border-[#dee2e6] rounded-[8px] px-[15px] py-[12px] w-full mt-2"
          placeholder="Full Name"
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={formData.email}
          className="border border-[#dee2e6] rounded-[8px] px-[15px] py-[12px] w-full mt-2"
          disabled
        />
      </div>
      <div>
        <label htmlFor="dob">Date of Birth</label>
        <input
          type="date"
          value={formData.dob}
          onChange={(e) =>
            setFormData({ ...formData, dob: e.target.value })
          }
          className="border border-[#dee2e6] rounded-[8px] px-[15px] py-[12px] w-full mt-2"
        />
      </div>
      <div>
        <label htmlFor="phone">Phone Number</label>
        <input
          type="text"
          value={formData.phone}
          onChange={(e) =>
            setFormData({ ...formData, phone: e.target.value })
          }
          className="border border-[#dee2e6] rounded-[8px] px-[15px] py-[12px] w-full mt-2"
          placeholder="Phone Number"
        />
      </div>
    </div>

    <div className="mt-10">
      <h2 className="text-[22px] font-semibold mb-4">My Documents</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {["PAN", "CMR"].map((doc) => (
          <div
            key={doc}
            className="bg-white shadow border-[#e4e8eb] rounded-[10px] p-5 border flex flex-col gap-4"
          >
            <div className="flex items-center gap-2 text-[#000] font-semibold">
              <span className="p-3 text-[14px] rounded-[10px] bg-green-600 text-white">
                <FaUpload />
              </span>
              {doc}
            </div>
            <input
              type="file"
              className="border border-[#f4f5f7] rounded-[8px] bg-[#f4f5f7] px-4 py-2 cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>

    <div className="mt-8 text-right">
      <button className="bg-green-600 text-white px-6 py-2 rounded-[14px] hover:bg-green-700 cursor-pointer">
        Save Changes
      </button>
    </div>
  </>
  );
}
