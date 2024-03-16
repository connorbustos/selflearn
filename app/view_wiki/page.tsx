"use client";
import WikiLayout from "@/components/WikiLayout";
import { Button } from "@/components/ui/button";
import { useUserDataStore } from "@/store/userData.store";
import { useWikiDataStore } from "@/store/wikiData.store";
import React, { useEffect } from "react";
import { WikiData } from "../types/Wiki";
import { UserData } from "../types/User";
import Link from "next/link";

const wikiData = {
  title: "Intro to Python",
  content: [
    {
      contentType: "markdown",
      data: "# Libidine et novus si offensi subegit Iolciacos\n## Noctes illas sua pantherarum passa et latum\nLorem markdownum nulli; vel non sitis subsunt, tutus fata. Gaudere fraterna tauros At illas plenoque, poenamque nigrum: et urbem totiens, rabieque. Levibus tergo agricolam adieci, radiantis fidemque uteroque siccat: coniuge erat spolia. Litore Sirenes draconem, sed femineo gratos, si esse potentia; quercus? Olimerat et animal munere [Achelous](http://www.cephea.net/sua.html) filia Pamphagos agit. - Et postquam et erubuit parabant nec caelum - Minatur undis - Ire ad pondera se illo vetat flammaeque - Resque degravat his ille sed est Inachus",
    },
    {
      contentType: "code",
      data: "'use client';\nimport React from 'react';\nimport WikiEditor from '@/components/WikiEditor';\nconst WikiEditPage = () => {\nreturn <WikiEditor />;\n}; export default WikiEditPage;",
    },
    {
      contentType: "markdown",
      data: "# Libidine et novus si offensi subegit Iolciacos\n## Noctes illas sua pantherarum passa et latum\nLorem markdownum nulli; vel non sitis subsunt, tutus fata. Gaudere fraterna tauros At illas plenoque, poenamque nigrum: et urbem totiens, rabieque. Levibus tergo agricolam adieci, radiantis fidemque uteroque siccat: coniuge erat spolia. Litore Sirenes draconem, sed femineo gratos, si esse potentia; quercus? Olimerat et animal munere [Achelous](http://www.cephea.net/sua.html) filia Pamphagos agit. - Et postquam et erubuit parabant nec caelum - Minatur undis - Ire ad pondera se illo vetat flammaeque - Resque degravat his ille sed est Inachus",
    },
    {
      contentType: "code",
      data: "'use client';\nimport React from 'react';\nimport WikiEditor from '@/components/WikiEditor';\nconst WikiEditPage = () => {\nreturn <WikiEditor />;\n}; export default WikiEditPage;",
    },
  ],
  owner: "isaackimmi",
};

const userData = {
  name: "Isaac Kim",
  username: "isaackimmi",
  password: "test",
};

const fetchMockUserData = async (): Promise<UserData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userData);
    }, 1000);
  });
};

const fetchMockWikiData = async (): Promise<WikiData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(wikiData);
    }, 1000);
  });
};

const ViewWiki = () => {
  const { title, content, setTitle, setContent, setOwner } = useWikiDataStore();
  const { setName, setPassword, setUsername } = useUserDataStore();

  useEffect(() => {
    const fetchAsyncData = async () => {
      const { title, content, owner } = await fetchMockWikiData();
      const { name, username, password } = await fetchMockUserData();

      setTitle(title);
      setContent(content);
      setOwner(owner);

      setName(name);
      setUsername(username);
      setPassword(password);
    };

    fetchAsyncData();
  }, [setContent, setName, setOwner, setPassword, setTitle, setUsername]);

  return (
    <div className="w-screen">
      <div className="w-full py-4 px-4">
        <div className="w-fit sticky top-8 left-10">
          <Link href={"/create_new_wiki"}>
            <Button>Edit Wiki</Button>
          </Link>
        </div>
        <WikiLayout />
      </div>
    </div>
  );
};

export default ViewWiki;
