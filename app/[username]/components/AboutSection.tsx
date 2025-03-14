
import { User } from "lucide-react";


const AboutSection = ({ about }: { about: string }) => {

    return (
        <div className="bg-white shadow-md border rounded-xl p-4 w-full max-w-">
            <div className="flex items-center gap-2 mb-2">
                <User className="text-blue-600" size={20} />
                <h2 className="text-lg font-semibold">About</h2>
            </div>
            <p className="text-gray-700 text-sm">

                {about} 

            </p>
        </div>
    );
};

export default AboutSection;