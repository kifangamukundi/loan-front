'use client'

import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useDarkMode } from 'kifanga-ui-state';

export default function PrimaryEditor({ editorInstanceHandler, editorConfig, initialValue, error  }) {
  const editorRef = useRef(null);
  const { darkMode } = useDarkMode();
  const handleChange = (content, editor) => {
    editorInstanceHandler(content, editor);
 }
  return (
    <>
      {error && (
        <div className="text-red-500 text-sm mt-1">
          {error.map((err, index) => (
            <p key={index}>{err}</p>
          ))}
        </div>
      )}
      <Editor
        apiKey='6zp9wek8z5cugv6x71hqlufe5ah6fg17bk0fk0p8kucs5g7a'
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue={initialValue || "<p>This is the initial content of the editor.</p>"}
        init={{
          height: editorConfig.height || 500,
          selector: editorConfig.selector || "textarea",
          menubar: editorConfig.menubar || false,
          plugins: editorConfig.plugins || [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: editorConfig.toolbar || 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          skin: darkMode ? "oxide-dark" : "oxide",
          content_css: darkMode ? "dark" : "default",
        }}
        onEditorChange={handleChange}
      />
    </>
  );
}