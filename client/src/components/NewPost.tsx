import { ArrowLeft } from "lucide-react";
import { Separator } from "./ui/separator";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import formSchema from "@/utils/formSchema";
import { Textarea } from "./ui/textarea";
import Tiptap from "./Tiptap";
import axios from "axios";
import { SERVER_URL } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import RootState from "@/interfaces/RootState";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { removeWhatsNewPosts, setRefetch } from "@/redux/postSlice";
import {
  removeUserPosts,
  setUserPostsHasMore,
  setUserPostsPage,
  setUserPostsRefetch,
} from "@/redux/profileSlice";

const NewPost = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const [isSubmited, setIsSubmited] = useState(false);
  const dispatcher = useDispatch();

  useEffect(() => {
    if (!isSubmited) return;
    dispatcher(removeWhatsNewPosts());
    dispatcher(setRefetch(true));
    dispatcher(removeUserPosts());
    dispatcher(setUserPostsRefetch(true));
    dispatcher(setUserPostsPage(1));
    dispatcher(setUserPostsHasMore(true));
    navigate("/home");
  }, [isSubmited]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      body: "",
    },
  });

  const handlePostSubmission = async (data: z.infer<typeof formSchema>) => {
    try {
      const loadToast = toast.loading("Submiting post...");
      const response = await axios.post(`${SERVER_URL}/api/v1/posts/add-post`, {
        title: data.title,
        description: data.description,
        body: data.body,
        user: user?.user,
      });

      if (response.data?.success) {
        toast.dismiss(loadToast);
        toast.success("Post submitted successfully!", {
          style: {
            fontWeight: "bolder",
            color: "#fff",
            backgroundColor: "#007E50",
          },
        });
        setIsSubmited(true);
      }
    } catch (error) {
      toast.error(
        "Something went wrong! Please check your internet connection",
        {
          style: {
            fontWeight: "bolder",
            color: "#fff",
            backgroundColor: "#FF0000",
          },
        }
      );
      console.error(error);
    }
  };

  function onSubmit(data: z.infer<typeof formSchema>) {
    // check for empty body
    const pattern = /<p>\s*<\/p>/;
    if (pattern.test(data.body)) return;
    // create post
    handlePostSubmission(data);
  }

  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#d0daf5] to-[#fff] dark:bg-gradient-to-bl dark:from-[#111524] dark:to-[#000000] px-6">
      <div className="max-w-[80rem] mx-auto">
        <div className="flex flex-col py-6 sm:pb-10 min-h-screen">
          <ArrowLeft
            onClick={() => navigate(-1)}
            className="h-6 w-6 cursor-pointer text-black dark:text-white"
          />
          <Separator className="my-4" />
          <div className="flex-1 flex flex-col">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 flex flex-col flex-1"
              >
                <div>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Title"
                            className="resize-none font-raleway text-black dark:text-white scroll-m-20 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="bg-transparent px-3 my-2 text-black dark:text-white text-base font-normal tracking-tight lg:text-xl"
                            placeholder="A short description of your story"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1 flex">
                  <FormField
                    control={form.control}
                    name="body"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Tiptap
                            description={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  className="w-min self-end dark:text-white"
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
