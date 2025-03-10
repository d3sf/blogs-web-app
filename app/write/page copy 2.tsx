
"use client"

import { useState } from "react";
import SvgIconUse from "../components/ui/SvgIconUse";


const WriteBlog = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    return (
        <div className="mt-7 flex justify-center items-center ">

            <div>
                <div className="">

                    <div className="flex justify-center items-center gap-2 text-4xl font-bold mb-4 font-serif">
                        <SvgIconUse />
                        <div>
                            <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={
                                    (e) => setTitle(e.target.value)
                                }
                                className=""
                            />
                        </div>

                    </div>
                </div>
                <div className=" font-serif">
                    <input
                        type="text"
                        placeholder="Share your thoughts..."
                        value={content}
                        onChange={
                            (e) => setContent(e.target.value)
                        }

                    />
                </div>
            </div>

        </div>


    )

}


export default WriteBlog;