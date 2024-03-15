"use client";
import WikiLayout from "@/components/WikiLayout";
import React, { useState } from "react";

const wikiData = {
  name: "Intro to Python",
  content: [
    {
      isCode: false,
      data: "# Libidine et novus si offensi subegit Iolciacos\n## Noctes illas sua pantherarum passa et latum\nLorem markdownum nulli; vel non sitis subsunt, tutus fata. Gaudere fraterna tauros At illas plenoque, poenamque nigrum: et urbem totiens, rabieque. Levibus tergo agricolam adieci, radiantis fidemque uteroque siccat: coniuge erat spolia. Litore Sirenes draconem, sed femineo gratos, si esse potentia; quercus? Olimerat et animal munere [Achelous](http://www.cephea.net/sua.html) filia Pamphagos agit. - Et postquam et erubuit parabant nec caelum - Minatur undis - Ire ad pondera se illo vetat flammaeque - Resque degravat his ille sed est Inachus",
    },
    {
      isCode: true,
      data: "'use client';\nimport React from 'react';\nimport WikiEditor from '@/components/WikiEditor';\nconst WikiEditPage = () => {\nreturn <WikiEditor />;\n}; export default WikiEditPage;",
    },
    {
      isCode: false,
      data: "# Libidine et novus si offensi subegit Iolciacos\n## Noctes illas sua pantherarum passa et latum\nLorem markdownum nulli; vel non sitis subsunt, tutus fata. Gaudere fraterna tauros At illas plenoque, poenamque nigrum: et urbem totiens, rabieque. Levibus tergo agricolam adieci, radiantis fidemque uteroque siccat: coniuge erat spolia. Litore Sirenes draconem, sed femineo gratos, si esse potentia; quercus? Olimerat et animal munere [Achelous](http://www.cephea.net/sua.html) filia Pamphagos agit. - Et postquam et erubuit parabant nec caelum - Minatur undis - Ire ad pondera se illo vetat flammaeque - Resque degravat his ille sed est Inachus",
    },
    {
      isCode: true,
      data: "'use client';\nimport React from 'react';\nimport WikiEditor from '@/components/WikiEditor';\nconst WikiEditPage = () => {\nreturn <WikiEditor />;\n}; export default WikiEditPage;",
    },
  ],
  owner: "isaackimmi",
};

interface ViewWikiProps {}

const ViewWiki = ({}: ViewWikiProps) => {
  return (
    <div className="w-screen overflow-hidden">
      <div className="w-full">
        <WikiLayout wikiData={wikiData} />
      </div>
    </div>
  );
};

export default ViewWiki;
