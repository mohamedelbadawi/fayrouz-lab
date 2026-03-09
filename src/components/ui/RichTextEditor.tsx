"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'suneditor/dist/css/suneditor.min.css';
import './suneditor-custom.css';

const SunEditor = dynamic(() => import('suneditor-react'), { ssr: false });

interface RichTextEditorProps {
  name: string;
  placeholder?: string;
  defaultValue?: string;
}

export function RichTextEditor({ name, placeholder, defaultValue = "" }: RichTextEditorProps) {
  const [content, setContent] = useState(defaultValue);

  return (
    <div className="rich-text-editor-wrapper bg-white rounded-xl overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-primary-light-green/20 focus-within:border-primary-light-green transition-all" dir="rtl">
      <input type="hidden" name={name} value={content} />
      <SunEditor
        defaultValue={content}
        onChange={(content) => setContent(content)}
        setOptions={{
          buttonList: [
            ['undo', 'redo'],
            ['font', 'fontSize', 'formatBlock'],
            ['paragraphStyle', 'blockquote'],
            ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
            ['fontColor', 'hiliteColor', 'textStyle'],
            ['removeFormat'],
            ['outdent', 'indent'],
            ['align', 'horizontalRule', 'list', 'lineHeight'],
            ['table', 'image'],
            ['fullScreen', 'showBlocks', 'codeView'],
            ['preview']
          ],
          defaultTag: 'p',
          imageAccept: '.jpg,.jpeg,.png,.webp,.gif',
          placeholder: placeholder || 'ابدأ الكتابة هنا...',
          rtl: true,
          font: ['Cairo', 'Tajawal', 'Arial', 'Courier New', 'Times New Roman'],
          defaultStyle: 'font-family: inherit; font-size: 16px;',
          minHeight: '350px',
        }}
      />
    </div>
  );
}
