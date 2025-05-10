import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface ContentEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
}

const ContentEditor = ({ value, onChange, placeholder, readOnly = false }: ContentEditorProps) => {
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
    'align', 'code-block'
  ];

  const modules = {
    toolbar: !readOnly ? {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
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
      <div className="border border-gray-300 rounded-md h-64 bg-gray-50 p-4 text-gray-500 flex items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        <span className="ml-3">Loading editor...</span>
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
        className={`${readOnly ? 'quill-readonly' : ''}`}
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
          border-bottom-left-radius: 0.375rem;
          border-bottom-right-radius: 0.375rem;
        }
        .rich-text-editor .ql-toolbar {
          border-top-left-radius: 0.375rem;
          border-top-right-radius: 0.375rem;
          background-color: #f9fafb;
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

export default ContentEditor;
