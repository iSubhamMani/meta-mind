// src/Tiptap.jsx
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "./Toolbar";
import { Placeholder } from "@tiptap/extension-placeholder";

export default function Tiptap({
  description,
  onChange,
}: {
  description: string;
  onChange: (richText: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          HTMLAttributes: {
            class: "text-2xl sm:text-4xl font-bold",
            levels: [2],
          },
        },
        blockquote: {
          HTMLAttributes: {
            class:
              "mt-6 border-l-2 pl-6 italic border-primary pl-4 text-slate-600 dark:text-slate-400",
          },
        },
      }),
      Placeholder.configure({
        emptyEditorClass: "is-editor-empty",
        placeholder: "Write your story...",
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class:
          "font-lato flex-1 leading-7 [&:not(:first-child)]:mt-6 text-lg sm:text-xl px-4 sm:px-6 py-4 border-none dark:text-secondary rounded-md border focus-within:outline-none",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col flex-1 gap-6">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className="flex-1 flex" />
    </div>
  );
}
