"use client"
import React, { useRef, useEffect } from 'react';

import { Fancybox as NativeFancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

const Fancybox = (props) => {
   const containerRef = useRef(null);

   useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const delegate = props.delegate || '[data-fancybox]';
      const options = props.options || {};

      NativeFancybox.bind(container, delegate, options);

      return () => {
         NativeFancybox.unbind(container);
         NativeFancybox.close();
      };
   }, []); // Empty dependency - bind เพียงครั้งเดียวตอน mount

   return <div ref={containerRef}>{props.children}</div>;
}

export default Fancybox
