import Container from "@/components/container";
import ContactForm from "@/components/ContactForm";
import {
    MapPinIcon,
    EnvelopeIcon,
    PhoneIcon
} from "@heroicons/react/24/outline";
export default function Contact({ settings }) {
    return (
        <Container>
            <h1 className="text-brand-primary mb-3 mt-2 text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
                Contact
            </h1>
            <div className="text-center">
                <p className="text-lg">Let's chat!</p>
            </div>

            <div className="mt-10 grid md:grid-cols-2">
                <div className="my-10">
                    <h2 className="text-2xl font-semibold dark:text-white">
                        Contact Explore AI Today
                    </h2>
                    <p className="mt-5 max-w-sm">
                        Have something to say? Let's connect!. Fill
                        out the form or send an email and we'll chat.
                    </p>

                    <div className="mt-5">
                        {/* <div className="text-dark-600 mt-2 flex items-center space-x-2 dark:text-gray-400">
                            <MapPinIcon className="h-4 w-4" />
                            <span>1734 Sanfransico, CA 93063</span>
                        </div> */}
                        {settings?.email && (
                            <div className="text-dark-600 mt-2 flex items-center space-x-2 dark:text-gray-400">
                                <EnvelopeIcon className="h-4 w-4" />
                                <a href={`mailto:${settings.email}`}>
                                    {settings.email}
                                </a>
                            </div>
                        )}
                        {settings?.phone && (
                            <div className="text-dark-600 mt-2 flex items-center space-x-2 dark:text-gray-400">
                                <PhoneIcon className="h-4 w-4" />
                                <a href={`tel:${settings.phone}`}>
                                    {settings.phone}
                                </a>
                            </div>
                        )}
                    </div>
                </div>
                <ContactForm />
            </div>
        </Container>
    );
}
