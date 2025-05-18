import { useState } from "react";

export default function Product() {
    const scriptURL =
        "https://script.google.com/macros/s/AKfycbzwUr-q_XR6XMDIb4wCJK8XakC5358ip0gNqGEXtuIzGc8fTvFEyG78I3nsWZ_BcocH/exec";
    const [msg, setMsg] = useState("");
    const [formData, setFormData] = useState({
        Date: "",
        "Product Name": "",
        "Category Name": "",
        Quantity: "",
        "Total Price": "",
        Credit: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg("Entry Submitting....");

        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });

            await fetch(scriptURL, { method: "POST", body: formDataToSend });
            setMsg("Entry Submitted Successfully!");
            alert("Entry Submitted Successfully!");
            setTimeout(() => setMsg(""), 1000);
            setFormData({
                Date: "",
                "Product Name": "",
                "Category Name": "",
                Quantity: "",
                "Total Price": "",
                Credit: "",
            });
        } catch (error) {
            setMsg("Error submitting form!");
            alert("Error submitting form!");
            console.error("Error!", error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-300 via-blue-200 to-blue-500 w-full">
            <h1 className="text-3xl sm:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400 mb-6">
                PRADHAN MOTORS
            </h1>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md text-center">
                <h2 className="text-xl xl:text-xl font-semibold text-blue-500 mb-3">Product Entry</h2>
                <span className="text-green-600 text-sm">{ msg }</span>
                <form onSubmit={ handleSubmit } className="space-y-2">
                    { [
                        { label: "Date", type: "date", name: "Date" },
                        { label: "Product Name", type: "text", name: "Product Name" },
                        { label: "Category Name", type: "text", name: "Category Name" },
                        { label: "Quantity", type: "number", name: "Quantity" },
                        { label: "Total Price", type: "number", name: "Total Price" },
                        { label: "Credit", type: "number", name: "Credit" },
                    ].map(({ label, type, name }) => (
                        <div key={ name } className="flex flex-col text-left">
                            <label className="text-blue-500 text-sm font-medium mb-1">{ label }:</label>
                            <input
                                type={ type }
                                name={ name }
                                value={ formData[name] }
                                onChange={ handleChange }
                                required={ !(name === "Category Name" || name === "Credit") }
                                className="w-full p-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    )) }
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-3 py-2.5 rounded-lg w-full hover:bg-green-500 transition"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
