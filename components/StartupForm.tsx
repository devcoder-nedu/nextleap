"use client"
import React, {useActionState, useState} from 'react'
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import MDEditor from '@uiw/react-md-editor';
import {Send} from "lucide-react";
import {formSchema} from "@/lib/validation";
import {z} from "zod"
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {createPitch} from "@/lib/actions";


const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [pitch, setPitch] = useState("");

    const router = useRouter();


    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch,
            }

            await formSchema.parseAsync(formValues);


            const result = await createPitch(prevState, formData, pitch)

            if (result.status == "SUCCESS") {
                toast.success(`{
                    title: "Success",
                    description: "Your STARTUP pitch has been created successfully",
                }`)

                router.push(`/startup/${result._id}`)
            }

            return result


        } catch (error) {
            if (error instanceof z.ZodError) {
                console.log(error)
                const fieldErrors = error.flatten().fieldErrors;
                console.log(fieldErrors)
                setErrors(fieldErrors as unknown as Record<string, string>);

                toast.error(`{
                    title: "Error",
                    description: "Please check your input and try again",
                }`)

                return {...prevState, error: 'validation failed', status: "Error"}
            }

            toast.error(`{
                    title: "Error",
                    description: "an unexpected error occurred",
                }`)

            return {
                ...prevState,
                error: "An unexpected error has occured",
                status: "ERROR"
            }

            // console.log(error)
        }
    };


    const [state, formAction, isPending] = useActionState(handleFormSubmit, {
        error: "",
        status: "INITIAL"
    });


    return (
        <form action={formAction} className={"startup-form"}>
            <div>
                <label htmlFor="title" className={"startup-form_label"}>Title</label>
                <Input id={"title"} name={"title"} className={"Startup-form_input"} required
                       placeholder="Startup Title"/>
                {errors.title && <p className={"startup-form_error"}>
                    {errors.title}
                </p>}
            </div>
            <div>
                <label htmlFor="description" className={"startup-form_label"}>Description</label>
                <Textarea id={"description"} name={"description"} className={"Startup-form_textarea"} required
                          placeholder="Startup Description"/>
                {errors.description && <p className={"startup-form_error"}>
                    {errors.description}
                </p>}
            </div>
            <div>
                <label htmlFor="category" className={"startup-form_label"}>Category</label>
                <Input id={"category"} name={"category"} className={"Startup-form_input"} required
                       placeholder="Startup Category ... Tech, Business, Sales, Oil And Gas"/>
                {errors.category && <p className={"startup-form_error"}>
                    {errors.category}
                </p>}
            </div>
            <div>
                <label htmlFor="link" className={"startup-form_label"}>Image URL</label>
                <Input id={"link"} name={"link"} className={"Startup-form_input"} required
                       placeholder="Startup Image URL"/>
                {errors.link && <p className={"startup-form_error"}>
                    {errors.link}
                </p>}
            </div>
            <div data-color-mode={"light"}>
                <label htmlFor="pitch" className={"startup-form_label"}>Pitch</label>
                <MDEditor
                    value={pitch}
                    onChange={(value) => {
                        setPitch(value as string)
                    }}
                    id="pitch"
                    preview={"edit"}
                    height={300}
                    style={{borderRadius: "20", overflow: "hidden"}}
                    textareaProps={{
                        placeholder: "Briefly describe your idea and what problem it solves",
                    }}
                    previewOptions={{
                        disallowedElements: ["style"]
                    }}
                />
                {errors.pitch && <p className={"startup-form_error"}>
                    {errors.pitch}
                </p>}
            </div>
            <Button type="submit" className={"startup-form_button text-white"} disabled={isPending}>
                {isPending ? "Submitting ...." : "Submit"}
                <Send className={"size-6 ml-2"}/>
            </Button>
        </form>
    )
}
export default StartupForm
