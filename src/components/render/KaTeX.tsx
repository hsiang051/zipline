import { useEffect, useState } from 'react';

import 'katex/dist/katex.min.css';
import { Alert, Paper } from '@mantine/core';
import * as sanitize from 'isomorphic-dompurify';

export default function KaTeX({ tex }: { tex: string }) {
  const [html, setHtml] = useState('');
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    import('katex').then(({ default: { renderToString } }) => {
      try {
        const html = renderToString(tex, { throwOnError: true });
        setHtml(sanitize.sanitize(html));
      } catch (err) {
        setError(err);
      }
    });
  }, [tex]);

  if (error) {
    return (
      <Alert color='red' title='KaTeX error'>
        {error.toString()}
      </Alert>
    );
  }

  return (
    <Paper withBorder p='md'>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Paper>
  );
}
