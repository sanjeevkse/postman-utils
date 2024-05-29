'use client';

import { resolveArray } from '#/utils/resolveArray';
import { resolveObject } from '#/utils/resolveObject';
import { useEffect, useState } from 'react';

export default function Page() {
  const [jsonData, setJsonData] = useState<string>('');
  const [formData, setFormData] = useState<string>('');

  const convertJsonToFormData = () => {
    try {
      // Parse the raw JSON data
      let _formData = '';

      const buildFormData = (prefix: string, obj: any) => {
        if (typeof obj === 'object' && !Array.isArray(obj)) {
          for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
              const value = obj[key];
              const newPrefix = prefix ? `${prefix}[${key}]` : key;
              buildFormData(newPrefix, value);
            }
          }
        } else if (Array.isArray(obj)) {
          obj.forEach((item, index) => {
            const newPrefix = `${prefix}[${index}]`;
            buildFormData(newPrefix, item);
          });
        } else {
          _formData += `${prefix}: ${obj}\n`;
        }
        return _formData;
      };

      const jsonObject = JSON.parse(jsonData);
      const returnFormData = buildFormData('', jsonObject);
      console.log(returnFormData);
      setFormData(returnFormData.trim());
    } catch (err) {
      // SyntaxError is in case JSON.parse() fails (invalid JSON)
      console.log(err);
      if (err instanceof SyntaxError) {
        setFormData('Invalid JSON');
      } else {
        setFormData(
          'It seems like, we got an unknown error. please create a github issue with your use case. We will try to resolve it as soon as possible.',
        );
      }
    } finally {
      // Always scroll to the bottom of the page
      window.scrollTo(0, document.body.scrollHeight);
    }
  };

  useEffect(() => {
    if (jsonData) {
      convertJsonToFormData();
    } else {
      setFormData('');
    }
  }, [jsonData]);

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-medium text-gray-300">
        Request &gt; Raw to form-data
      </h1>
      {/**
       * Have 2 textareas side by side
       */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-medium text-gray-300">Raw</h2>
          <textarea
            className="h-96 w-full rounded-md bg-gray-900 p-4 text-gray-300"
            value={jsonData}
            onChange={(e) => setJsonData(e.target.value)}
          />
        </div>
        <div>
          <h2 className="text-lg font-medium text-gray-300">Form Data</h2>
          <textarea
            className="h-96 w-full rounded-md bg-gray-900 p-4 text-gray-300"
            value={formData}
            onChange={(e) => setFormData(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
