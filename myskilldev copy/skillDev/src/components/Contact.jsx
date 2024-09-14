import { useState } from 'react';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.success) {
                setResponseMessage('Thank you for your message. We will get back to you soon.');
            } else {
                setResponseMessage('There was an issue sending your message. Please try again later.');
            }
        } catch (error) {
            setResponseMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="by-14 dark:bg-black bg-slate-100 dark:text-dark sm:min-h-[800px] sm:grid sm:place-items-center">
            <div className="mt-6 max-w-6xl max-lg:max-w-3xl mx-auto rounded-lg">
                <div className="grid lg:grid-cols-2 items-center gap-14 sm:p-8 p-4 font-[sans-serif]">
                    <div data-aos="fade-up" data-aos-duration="1000">
                        <h1 className="text-4xl font-bold dark:bg-black dark:text-white">Get in Touch</h1>
                        <p className="text-sm dark:bg-black dark:text-white mt-4 leading-relaxed">
                            Have some big idea or brand to develop and need help? Reach out, we'd love to hear about your project.
                        </p>

                        {/* Contact Info (email, phone, address) */}
                        {/* ... your existing contact information code ... */}
                    </div>

                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-primary">Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-primary">Your Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-primary">Your Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-700"
                            >
                                Send Message
                            </button>
                        </form>

                        {responseMessage && (
                            <p className="mt-4 text-green-600">{responseMessage}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
