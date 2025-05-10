import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
}

const RichTextEditor = ({ value, onChange, placeholder, readOnly = false }: RichTextEditorProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'color', 'background',
    'align', 'code-block', 'formula'
  ];

  const modules = {
    toolbar: !readOnly ? {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['clean']
      ],
    } : false,
    clipboard: {
      matchVisual: false,
    }
  };

  if (!mounted) {
    return (
      <div className="border border-gray-300 rounded-md h-64 bg-gray-50 p-4 text-gray-500">
        Loading editor...
      </div>
    );
  }

  return (
    <div className="rich-text-editor">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        formats={formats}
        modules={modules}
        placeholder={placeholder || "Write your content here..."}
        readOnly={readOnly}
        className={`${readOnly ? 'quill-readonly' : ''} min-h-[200px]`}
      />
      <style jsx global>{`
        .rich-text-editor .quill {
          border-radius: 0.375rem;
          overflow: hidden;
        }
        .rich-text-editor .ql-container {
          min-height: 200px;
          font-size: 16px;
          font-family: inherit;
        }
        .rich-text-editor .ql-editor {
          min-height: 200px;
          max-height: 500px;
          overflow-y: auto;
        }
        .rich-text-editor .quill-readonly .ql-editor {
          padding: 0;
          border: none;
        }
        .rich-text-editor .quill-readonly .ql-toolbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
