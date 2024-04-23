"use client";
import React from "react";
import Link from "next/link";
import { render } from "react-dom";

const Footer = () => {
        return (
            <div id="footer">
                <div className="text-center py-4">
                    <div className="contact-info">
                    <Link href="https://www.linkedin.com/in/connorbustos">
                        Connor Bustos
                    </Link> 
                    <span> | </span>
                    <Link href="https://www.linkedin.com/in/sahiti-hibane/">
                        Sahiti Hibane
                    </Link>
                    <span> | </span>
                    <Link href="https://www.linkedin.com/in/isaac-kimmi">
                        Isaac Kim
                    </Link>
                    <span> | </span>
                    <Link href="">
                        Nguyen Chau
                    </Link>
                    </div>
                    <p>Copyright © 2024, SelfLearn LLC. All Rights Reserved.</p>
                </div>
            </div>
        )    
}

export default Footer;
