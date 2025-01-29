import { applyCoupon } from "@/app/utils/admin/coupon/api";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "he", // Default fallback language
  supportedLngs: ["en", "he"], // Supported languages
  lng: "he", // Default language
  debug: true, // Enable during development
  resources: {
    en: {
      translation: {
        imageSize: "Please upload image less then 1 mb",
        noBlogsYet: "No Blogs Yet",
        editExam: "Edit Exam",
        noExamYet: "No Exams Yet",
        nosummariesyet: "No Summaries Yet",
        editCourseModalTitle: "Edit Course",
        summaryTxt:
          "Mark this summary as completed to calculate your course progress.",
        veeCode: "vee code",
        // landing page start
        seeAll: "See All",
        courseDetailsHeading: "Course Details",
        uploadMaterialHeading: "Upload Materials",
        defineSummariesHeading: "Define Summaries",
        defineExamsHeading: "Define Exams",
        examDetailHeading: "Exam Details",
        defineQuestionHeading: "Define Questions",
        editCourseHeading: "Edit Course",
        createCourseHeading: "Create Course",
        noRatingsYet: "No Ratings Yet",
        averageRatings: "Average Rating & Breakdown",
        totalCourse: "Total Courses",
        totalStudents: "Total Courses",
        coursesCount: "Courses",
        extraMaterialHeading: "Extra Material",
        wrongQuestiontitle: "Questions I Got Wrong",
        scoreTxt: "Score",
        needHelp: "Need Help ?",
        closeBtn: "close",
        hint: "hint",
        Filter: "Filter",
        Topics: "Topics",
        Subtopics: "Sub Topics",
        SubsubTopics: "Sub subtopic",
        Apply: "Apply",
        SearchResults: "Search Results",
        home: "Home",
        about: "About",
        applyCoupon: "Apply Coupon",
        buyCourse: "Buy Course",
        reviews: "Reviews",
        personalArea: "Personal Area",
        noCourseFound: "No courses found for the selected topic.",
        recomendedCourses: "Recomended Courses",
        startNow: "Start Now",
        popularTopic: "Popular Topics",
        contact: "Contact",
        dashboard: "Dashboard",
        logout: "Logout",
        login: "Login",
        signup: "Sign Up",
        hero: {
          title: "Learn Anywhere, Anytime",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin commodo metus lectus, sit amet tincidunt mi iaculis eu.",
          searchPlaceholder: "Search",
        },
        reviews: {
          title: "Reviews",
          subtitle: "See what our students have to say",
          reviewsList: [
            {
              name: "Riki Bargal Bason",
              title: "Doctor",
              content:
                "As a full-time working mom, I’m so glad there’s a platform that provides high-quality, accessible content for kids at an affordable price. My children enjoy learning a variety of subjects – from theory to math – and everything is well-organized and easy to understand. It’s the perfect solution, allowing them to learn at their own pace. I can’t wait for the day when they’ll be able to use this platform to prepare for their military aptitude tests!",
            },
            {
              name: "Shaked Roth",
              title: "Client Portfolio Manager, Green Energy",
              content:
                "In my field, where constant learning is essential, this platform has been a game-changer. It offers access to professional, well-organized content, helping me develop new skills and grow at my own pace. I particularly love how it combines theoretical knowledge with practical tools that truly make a difference in my work.",
            },
            {
              name: "Noy zimmer",
              title: "Fullstack Developer",
              content:
                "As an engineer, I’m used to working with complex systems, but this platform truly surprised me. Everything is intuitive, user-friendly, and tailored to all types of users. I especially love the summaries that save me time and the tests that help me prepare in the best way possible. Highly recommended!",
            },
            {
              name: "Kewan Amer",
              title: "Civil Engineer",
              content:
                "As a civil engineer, I know how important it is to study in an organized way and focus on what truly matters. This platform excels at exactly that – it helps me structure my learning and presents everything in a clear and accessible manner. The tests and summaries are excellent, and I highly recommend it to anyone looking to study smartly and efficiently.",
            },
            {
              name: "Agam Vazana",
              title: "High School Student, Makeup Artist",
              content:
                "As a high school student, a makeup artist, and someone who’s constantly preparing for different exams, this platform has helped me in so many ways! Thanks to it, I’ve been able to easily prepare for my school exams, I’m now studying for my driving theory test, and I’m planning to prepare for the military aptitude tests the same way. Everything is well-organized, clear, and convenient, allowing me to study at my own pace without stress. Highly recommended for everyone!",
            },
            {
              name: "Yuval Ben Porat",
              title: "Civil Engineer",
              content:
                "As a civil engineer, I’m always looking for tools that help me learn efficiently and stay focused. This platform met all my needs – the summaries are well-organized and clear, the tests are tailored in a way that allows me to learn and improve, and it helps me save time and focus on what really matters. An excellent solution for anyone who wants to study smartly.",
            },
            {
              name: "Oriya Zakai",
              title: "Social Media Manager",
              content:
                "As a social media manager with a busy schedule, this platform is exactly what I needed. It provides me with access to professional content in a convenient and organized way, helping me learn new things at my own pace. I especially love the clear summaries and the tests that ensure I’ve understood everything. Highly recommended!",
            },
            {
              name: "Moshe Dagan",
              title: "Urban Planner",
              content:
                "As an urban planner, I appreciate having access to information that is clear and precise. This platform provides exactly that – focused summaries, tests that sharpen knowledge, and tools that help with effective learning. It saves me time and allows me to focus on what really matters. Highly recommended for anyone looking for a quality learning solution.",
            },
            {
              name: "Amit Avrahami",
              title: "Sales Manager in the Philippines",
              content:
                "As a sales manager abroad with a busy schedule, this platform is exactly what I needed. It allows me to study in an organized way without wasting time. The content is clear, the summaries are excellent, and the tests ensure I truly understand the material. A perfect solution for anyone who wants to learn efficiently, even when on the other side of the world.",
            },
            {
              name: "Yoav Peretz",
              title: "Business Owner, Private Chef",
              content:
                "As a business owner and private chef, my time is valuable, and this platform has helped me make the most of it. It provides access to high-quality content in a clear and organized way, allowing me to study during my free time, between orders and events. The summaries and practical tools offered by the platform have truly upgraded my learning experience. Highly recommended for anyone looking for a convenient and effective learning solution.",
            },
          ],
        },
        aboutSection: {
          title: "About Just A Game",
          para1:
            "Here, you can enrich your knowledge in the most efficient way. Our courses are designed so you can learn anywhere, anytime, with easy access to content. Whether you are a student, a teacher, or anyone looking to expand their knowledge, we have ensured the path is clear and the experience is simple and convenient.",
          para2:
            "Our courses are specially designed for those who love to learn anywhere—whether it’s on the couch, at the office, or even while waiting in line at the supermarket. And let’s be honest, if you’re learning while starting your morning, then we’ve done our job right!",
          para3:
            "So, find a comfortable spot, grab your coffee or tea (or beer, we won’t judge), and start learning at your own pace. Remember, we’re here to teach you and make sure you feel smarter and motivated with every step.",
        },
        footerSection: {
          logoDescription: "Easy to learn and succeed with a proven method.",
          legalMatters: "Legal Matters",
          termsOfUse: "Terms of Use",
          privacyPolicy: "Privacy Policy",
          cookiePolicy: "Cookie Policy",
          refundPolicy: "Refund Policy",
          accessibilityStatement: "Accessibility Statement",
          contactUs: "Contact Us",
          email: "service.justagame@gmail.com",
          faqs: "FAQs",
          subscribeTitle: "Subscribe Our Newsletter",
          subscribeDescription:
            "Corporate business typically refers to large-scale mansola it.",
          enterEmail: "Enter Email",
        },
        // landing page end
        // terms of use page start
        termsOfUse: {
          title: "Terms and Conditions",
          heading: "Terms OF Use",
          para1:
            "Lavi Finance (hereinafter: “the Company” or “we”) provides its clients with an online learning platform through professional courses available on the website https://justagame.tech/ (hereinafter: “the Site”). All use of the Site and the services offered on it by users (hereinafter: “Users” or “you”) shall be subject to and in accordance with the terms and conditions set forth in these Terms of Use.",
          point1: [
            {
              heading: "1. Agreement to the terms of use",
              para1:
                "Acceptance of Terms Please read these terms carefully before using the Site By logging in to the Site and/or using any tools or services offered on the Site and/or creating an account, you confirm that you have read, understood, and agreed to the following Terms of Use, including the terms outlined in the Company’s Privacy Policy, which is available at the link https://justagame.tech/privacy-policy and forms an integral part of these Terms of Use (hereinafter, collectively: “the Terms”)",
              para2:
                "You agree that as a User of the Site, the Terms will bind you and that you will comply with all applicable laws and regulations regarding the use of the Site. You hereby acknowledge that the Terms constitute a legally binding and enforceable agreement between the Company and yourself.",
              para3:
                "If you do not agree to any of the terms specified herein, you are immediately required to refrain from entering, logging in, or using the services offered on the Site.The Terms are written in the masculine form for convenience only and refer to both genders equally.",
            },
          ],
          point2: [
            {
              heading: "2. Registration",
              para1:
                "If accessing and/or using the Site and/or receiving the services offered on the Site requires registration, you will be asked to provide identifying details, such as name, email address, phone number, and/or other identifying information, to enable the Company to contact you.",
              para2:
                "The Company is not responsible, under any circumstances, for any damage and/or loss resulting from the provision of incorrect and/or incomplete information and/or any unauthorized disclosure of information belonging to any third party.",
            },
          ],
          point3: [
            {
              heading: "3. Payment",
              para1:
                "Use of all or part of the services offered by the Site may be subject to payment to the Company and/or other parties cooperating with the Company.",
              para2:
                "The Company’s paid services are detailed on the Site. For the avoidance of doubt, the Company reserves the right to periodically update the cost of the services provided as detailed on the Site and/or the cost structure as stated, at its sole discretion, without prior notice to the User and/or their consent. However, and without derogating from the above, notification of any updates to fees as described above and the effective date of such updates will be published on the Company’s Site and/or as part of an update to these Terms.",
              para2:
                "The Company reserves the right to discontinue, modify, or impose new or additional fees for the services provided via the Site, at the Company’s discretion and without the need for prior notice or the User’s or any third party’s consent, except for the publication of such changes on the Company’s Site.",
            },
          ],
          point4: [
            {
              heading: "4. Liability",
              para1:
                "The services offered on the Site may change from time to time and are provided “as is” (“AS IS”), for the convenience and personal use of the User only.",
            },
          ],
          point5: [
            {
              heading: "5. Direct Electronic Messaging/SMS",
              para1:
                "5.1: Promotional and/or marketing information and/or information regarding the Company’s products and services will be sent to the User based on the explicit consent provided by the User during registration on the Site or by any other means.",
              para2:
                "5.2: It is hereby clarified that the User’s consent to receive messages and promotional material as specified above constitutes consent in accordance with Section 30A of the Communications Law (Bezeq and Broadcasting), 1982.",
              para3:
                "5.3: The provision of an email address and/or mobile phone number and the User’s approval to receive communications in the designated area constitutes the User’s consent to receive communications, messages, and promotional materials, including information on sales, discounts, updates, and exclusive benefits related to all of the Company’s products and services, via various media channels, including SMS and email messages sent directly to the User’s mobile device or email inbox, and to be included on the Company’s mailing list for this purpose.",
              para4:
                "5.4: At any time, the User may request removal from the mailing list per the unsubscribe mechanism that will be included in each communication.",
            },
          ],
          point6: [
            {
              heading: "6. Prohibited Uses",
              description:
                "You may not (nor may you allow any third party), unless expressly permitted under these Terms of Use:",
              para1:
                " (a) use the Site and/or services for any unlawful, immoral, offensive, or harmful purpose, unauthorized and/or prohibited purpose;",
              para2:
                "(b) use the Site and/or services for commercial or non-private purposes without the express written and prior consent of the Company and/or its authorized representatives;",
              para3:
                "(c) remove or separate from the Site any restrictions or marks indicating proprietary rights of the Company or its licensors, including all proprietary notices appearing therein (such as ©, TM, or ®), and you declare and undertake that you will comply with all applicable laws in this matter;",
              para4:
                "(d) infringe or violate Users’ privacy rights and other rights (including, without limitation, intellectual property rights), or collect personally identifiable information about Users without their explicit consent, whether manually or by using any robot, spider, search or retrieval application, or use any manual or automatic means, process, or method to access the Site to retrieve, collect, and/or scrape information;",
              para5:
                "(e) damage, overload, or disrupt the operation of the Site and/or services, or violate any law, regulation, requirement, procedure, or policy of such servers or networks;",
              para6:
                "(f) make false or misleading statements, or misrepresent your relationship with any person or entity, or expressly or implicitly state that the Company is associated with you in any way, endorses, supports you, your business, or your statements, or present false or inaccurate information about the Site, services, and/or the Company;",
              para7:
                "(g) take any action that creates or could create a large and unreasonable load on the Site’s infrastructure",
              para8:
                "(h) bypass any measures the Company uses to prevent or restrict access to the Site;",
              para9:
                "(i) copy, alter, modify, adapt, convey, make accessible, translate, refer, reverse-engineer (unless applicable law explicitly prohibits such restriction), decompile, create derivative works, perform, distribute, sublicense, make any commercial use, sell, lease, transfer, lend, process, aggregate, combine with other software - of any material subject to the Company’s proprietary rights, including the Company’s intellectual property (as defined below), including all types of data accumulated in the Company’s databases, in any manner or by any means, unless expressly permitted by the Terms and/or under applicable law, permitting such actions explicitly;",
              para10:
                "(j) sell, license, or exploit any use or access to the Site for any commercial purpose;",
              para11:
                "(k) transfer or make accessible in any other way, in connection with the Site and/or services, any virus, “worm,” Trojan horse, bug, spyware, malware, or any other computer code, file, or software that may harm or is intended to harm the operation of any hardware, software, communication equipment, code, or component; and/or",
              para12:
                "(l) violate any of these Terms. Additionally, creating links to the Site is strictly prohibited unless expressly permitted by the Company in advance and in writing.",
            },
          ],
          point7: [
            {
              heading: "7. Intellectual Property Rights",
              para1:
                "The Site and the services offered therein, along with all associated intellectual property rights, including but not limited to patents and patent applications, trademarks and trademark applications, trade names, goodwill, copyrights, trade secrets, and domain names, whether registered or registrable or not (hereinafter, collectively: “Intellectual Property”) are owned by the Company and/or licensed to it and are protected by copyright laws, other intellectual property laws, as well as by international treaties and agreements. Any rights not explicitly granted to the User under this agreement remain with the Company and its licensors.",
              para2:
                "Subject to the Terms, the Company grants the User, and the User hereby accepts, a limited, personal, non-exclusive, fully revocable, non-transferable, and non-assignable license, which cannot be sublicensed, to use the Site and the services offered on it for private, non-commercial purposes, in accordance with the Terms. For clarity, the Terms do not grant the User any ownership in the Company’s Intellectual Property, only a limited right to use the services offered on the Site, which is revocable as outlined in the Terms. Nothing in the Terms constitutes a waiver of the Company’s intellectual property under any law.",
              para3:
                "The User hereby agrees that the Company may retain copies of certain information provided by the User for backup purposes or to enforce the Terms, including conducting investigations of potential violations of the Terms at the Company’s discretion, all subject to the Terms and applicable law.",
            },
          ],
          point8: [
            {
              heading: "8. Trademarks and Trade Names",
              para1:
                "The Company’s logos, trademarks, and other proprietary identifiers used in connection with the Site and/or services offered on the Site (hereinafter: “the Company’s Trademarks”) are all trademarks and/or trade names of the Company, whether registered or not and whether registrable or not. All other trademarks, trade names, other proprietary identifiers, and commercial symbols (including any logos) that may appear on the Site belong to their respective owners (hereinafter: “Third-Party Trademarks”). Third-Party Trademarks on the Site (if any) are displayed for purposes of presentation, description, and identification only.No rights, license, or ownership in the Company’s Trademarks or Third-Party Trademarks are granted herein, and the User must refrain from any use of these marks unless otherwise permitted under these Terms.",
            },
          ],
          point9: [
            {
              heading: "9. Changes to the Site",
              para1:
                "The Company reserves the right to make modifications, enhancements, improvements, adjustments, and any other changes to the Site, including ceasing its operations or any part of it, without prior notice and at any time. The User agrees that the Company and/or its authorized representatives shall not be liable to them or any third party for any modification, suspension, or discontinuation of the Site and/or services.",
              para2:
                "The Company has no obligation to provide updates or upgrades to the Site under these Terms. Where applicable, the Company will provide updates and support directly to the User at the Company’s discretion. If you require any assistance regarding the use of the Site and/or services, please contact us via the Site or at the following email address: service.justagame@gmail.com.",
            },
          ],
          point10: [
            {
              heading: "10. Privacy Policy",
              para1:
                "If you intend to access, log in, or use the Site and the services, you must first read and agree to the Privacy Policy. As the Privacy Policy may change from time to time, it is recommended that you check it periodically.",
              para2:
                "The Company respects your privacy and is committed to protecting the personal information you share with it. We believe that our Users have the full right to be familiar with our policies and procedures regarding the collection and use of information obtained by us when our Users use the Site and the services. The Company’s Privacy Policy, procedures, and the types of information collected by the Company and how it is used are described in the Site’s Privacy Policy, available at the following link: https://justagame.tech/privacy-policy.",
              para3:
                "You agree and authorize the Company to use personal information you have provided and/or made available to the Company according to the Company’s Privacy Policy.",
            },
          ],
          point11: [
            {
              heading: "11. Availability of the Site and Services",
              para1:
                "The availability and functionality of the Site depend on various factors. We will make reasonable efforts to ensure that the Site and services are continuously available. However, the Company shall not be responsible for, nor does it guarantee or commit that the Site and services will operate or be available at all times without interruptions or malfunctions and without any defects. You hereby agree that the Company shall not be responsible for any inability of the Site and/or services to operate or be accessible, for any reason, including but not limited to disruptions in Internet or network operations, hardware or software issues due to technical or other problems outside the Company’s control (such as force majeure, negligence of third parties, etc.). If maintenance of the Site is required in a way that affects its availability, the Company may (but is not obligated to) notify Users in advance.",
              para2:
                "Furthermore, the User acknowledges that the availability of a course after purchase is for a period of 3 months from the date of purchase. If the User is a subscriber in the system, the availability of each course will match the subscription period.",
            },
          ],
          point12: [
            {
              heading: "12. Limitation of Liability",
              para1:
                "To the fullest extent permitted by law, the Company, including its representatives, shall not be liable for any damages incurred by Users or third parties of any kind, including but not limited to direct, indirect, special, punitive, incidental, or consequential damages (including, without limitation, damages to reputation, profits, data, or business, and damages due to mental distress), on any legal grounds (including but not limited to contract, tort, strict liability, or otherwise) arising from these Terms of Use, from the Site, including from the use of the services, or from the inability to use the Site and/or services, from Users’ interactions with suppliers or other third parties arising from the use of the Site, or any action or omission by the Company and/or its representatives, based on any misrepresentation or commitment by the Company and/or its representatives, arising out of or related to the Terms; all of which apply whether or not the Company has been informed of the possibility of such damages.Without derogating from the above, to the fullest extent permitted by law, the cumulative liability of the Company and/or its representatives for any damages arising from these Terms of Use or regarding the User’s use of the Site and/or services shall be limited to the amount you paid (if applicable) to the Company in the year in which the event giving rise to the claim occurred, or alternatively, a sum of one hundred (100) New Israeli Shekels, whichever is higher.",
              para2:
                "If certain jurisdictions do not allow the exclusions or limitations as set out above, the exclusions and limitations mentioned above will apply to the fullest extent permitted by applicable law.",
            },
          ],
          point13: [
            {
              heading: "13. Indemnification",
              para1:
                "The User agrees to defend and indemnify the Company and its representatives against any claims, damages, losses, liabilities, expenses, and obligations (including attorney’s fees) arising from the use of the Site and/or services contrary to the Terms.",
            },
          ],
          point14: [
            {
              heading: "14. Changes to Terms of Use",
              para1:
                "The Company may, at its sole discretion, modify the Terms from time to time and requests that all Users check this page as often as possible. We will notify you of any material changes to the Terms by replacing the “Terms of Use” link on the homepage with a link named “Terms of Use” and/or by sending an email to the email address you may have provided to the Company as part of using the Site. Material changes will take effect seven (7) days from the date of such notice. All other changes to the Terms of Use will take effect on the last update date, and your continued use of the Site after the last update date will constitute your agreement that the changes will bind you. If changes to the Terms are necessary to comply with the law, such changes will take effect immediately or as required by law, without prior notice.",
            },
          ],
          point15: [
            {
              heading:
                "15. Termination of Site Activity and/or Account Closure",
              para1:
                "These Terms shall remain in effect until terminated as outlined herein. Your violation of the Terms may result in the termination of your license to use the Site and the closure of your Site account.",
              para2:
                "If you disagree with the Terms, as amended from time to time, or are dissatisfied with the Site and/or services, you may terminate these Terms at any time by permanently ceasing use of the Site and/or closing your account and/or sending a termination notice to service.justagame@gmail.com, which shall be your sole remedy. Upon termination, for any reason: (i) the licenses and other rights granted to you above will automatically terminate, (ii) you will immediately cease all use of the Site and/or services, and (iii) your account will be deleted, and/or access to it will be restricted. Account deletion may result in the deletion of data and information, and the Company shall bear no responsibility for data and information deleted in this manner.",
              para3:
                "The Company reserves the right, at any time, to block and/or permanently restrict the User’s access to the Site and/or their account and/or the services offered on the Site at its sole discretion, including but not limited to, if the Company suspects a violation of the Terms and/or any law by the User and/or any third party, in addition to any other remedy available to the Company by law.",
              para4:
                "Additionally, the Company may, at any time, at its sole discretion, cease the operation of the Site, temporarily or permanently, without prior notice. The User agrees and acknowledges that the Company shall not be responsible for any loss of information and/or damages arising or related to its decision to cease or suspend the Site’s operation.",
              para5:
                "The provisions of these Terms of Use, which by their nature survive the termination of the agreement to fulfill the objectives of the Terms, shall remain in effect. Without limiting the generality of the foregoing, the provisions regarding Intellectual Property, Disclaimer, Limitation of Liability, Indemnification, and “General” will continue to apply even after the termination of the agreement.",
            },
          ],
          point16: [
            {
              heading: "16. Digital Course",
              para1:
                "Purchasing a digital course on the Site requires prior registration, which includes entering personal details and creating a unique username and password.",
              para2:
                "The User must keep the username and password confidential and avoid sharing them with any third party. If the User suspects that their account has been compromised, they must immediately notify us via email at [insert email address].",
              para3:
                "The User is responsible for ensuring they have a stable and suitable internet connection for continuous viewing of course content streamed over the Internet.",
              para4:
                "All course content displayed on the Site is the exclusive property of the Company, and the User receives access rights solely for personal viewing, without additional rights.",
              para5:
                "Attempts to access the course from multiple devices or different IP addresses will result in the immediate blocking of access to the course.",
              subHeading: "Refunds and Cancellations Policy:",
              subPara1:
                "Product returns and transaction cancellations shall be performed according to the provisions of the Consumer Protection Law, 1981, as amended from time to time and in accordance with the regulations issued under it (hereinafter: “the Law”).",
              subPara2:
                "A User who has purchased a digital course may only cancel the purchase according to the provisions of the Law within 14 days from the date of purchase, provided that the course has not been accessed at all (not even one module). In the event of such a cancellation, a cancellation fee of 10% of the total payment or the processing fees, whichever is lower, will apply.",
              subPara3:
                "If the User has started viewing the course content, they will not be entitled to any refund, even partially.",
              subPara4:
                "The Company reserves the right to discontinue services to a User in case of non-payment or payment cancellation for the course.",
              subPara5:
                "The User agrees to receive invoices and relevant reports via the email provided during registration instead of receiving printed invoices by post.",
              subPara6:
                "In case of technical or other issues related to the User’s device, the Company shall not be responsible, nor will it issue any refunds. The User must ensure that their device is compatible for viewing content and that all necessary settings and updates are in place.",
              subHeading2: "Course Access Duration:",
              subPara7:
                "Access to course content will be available for 3 months from the registration date and will terminate automatically afterward.",
            },
          ],
          point17: [
            {
              heading: "17. General",
              para1:
                "(a) These Terms represent the entirety of the understandings and agreements achieved between you and the Company regarding the matters mentioned herein and supersede any prior understandings or agreements, written or oral, between you and the Company;",
              para2:
                "(b) Any claim regarding your use of the Site and/or services will be governed by and construed in accordance with the laws of the State of Israel (excluding international conflict-of-law rules), and the United Nations Convention on Contracts for the International Sale of Goods shall not apply",
              para3:
                "(c) Any dispute arising from or related to your use of the Site and/or services shall be brought to the competent courts in Tel Aviv District, Israel, and you hereby agree to the exclusive jurisdiction of these courts. You waive any objection to lack of jurisdiction or improper forum, and agree that you may be served with legal papers by any method permitted by law or as directed by a court",
              para4:
                "(d) These Terms shall not be construed as creating a partnership, joint venture, employment relationship, agency, or franchise relationship between the parties;",
              para5:
                "(e) No waiver of any breach or non-performance of these Terms will be deemed a waiver of any other breach or non-performance, whether prior or subsequent;",
              para6:
                "(f) Each section or sub-section title is for convenience only and does not constitute an integral part of the Terms or affect their interpretation;",
              para7:
                "(g) You agree that any claim you may have regarding the services or your use of the Site will be limited to one (1) year from the date the cause of action arose, and after this period, the claim will be time-barred;",
              para8:
                "(h) If any provision of these Terms is deemed unlawful, void, or unenforceable, that provision shall be limited or severed as necessary and shall not affect the validity of the remaining provisions of the Terms;",
              para9:
                "(i) You may not transfer or assign your rights or obligations under these Terms without our prior written approval. The Company may assign its obligations under these Terms to any third party without limitation;",
              para10:
                "(j) You agree that a printed version of these Terms and any notice given in electronic form shall be admissible in any legal or administrative proceeding to the same extent and subject to the same conditions as other business documents and records generated and maintained in printed form.",
            },
          ],
          point18: [
            {
              heading: "18. Questions",
              para1:
                "If you have any further questions or comments regarding the Terms, you are welcome to contact us via email at: service.justagame@gmail.com. We will make every effort to respond to you within a reasonable time.",
            },
          ],
          lastUpdate: "Last Updated Date: September 1, 2024",
        },
        // terms of use page end
        // Privacy Policy page start
        privacyPolicy: {
          title: "Privacy Policy",
          para1:
            "The following Privacy Policy applies to the use of the website of Lavi Finance Ltd. (hereinafter: “the Company”) at https://justagame.tech (hereinafter: “the Site”) and forms an integral part of the Site’s Terms of Use, available at the link https://justagame.tech/terms-conditions . The Company places great importance on protecting the privacy of Users on the Site, and this document outlines the policies the Company follows to safeguard your privacy. The Privacy Policy specifies the Company’s procedures regarding the collection, use, and disclosure of information that Site Users provide to the Company via the Site. Please read the Privacy Policy carefully before using the Site or providing any information through it. By using the Site and submitting information through it, you agree to the terms of this policy. The Privacy Policy is written in the masculine form for convenience only and, of course, refers to both genders. Terms not defined in this document shall have the meaning attributed to them in the Terms of Use.",
          heading1: "Information We Collect",
          para2:
            "The Company collects several types of information from Users on the Site:",
          point1:
            "1. Non-Personal Information (“Non-Personal Information”): This is information that does not personally identify the User, such as technical and anonymous data collected during browsing. This information includes, among other things, your IP address, browser type, access times, and the devices you use to browse. This information helps us improve the quality of services and analyze Site usage.",
          point2:
            "2. Personally Identifiable Information (“Personal Information”): This is private information that personally identifies you, such as your name, email address, and phone number. Personal Information is mainly collected when you use the services offered on the Site that require identification, such as opening and managing an account. If you choose not to provide certain details, you may not be able to use some of the services offered on the Site.",
          para3:
            "Non-Personal Information that is combined with Personal Information will be considered Personal Information as long as this connection exists.",
          para4:
            "Note: We will not collect Personal Information about you without your explicit consent, which is provided, among other ways, by your acceptance of the Terms of Use and this Privacy Policy, and by using the Site.",
          heading2: "How We Use the Personal Information We Collect",
          para5:
            "The Company will use the Personal Information in accordance with this Privacy Policy and the Terms of Use, for purposes that include:",
          bullet1:
            "Providing Services: We use Personal Information to provide you with the services you requested or to improve the quality of existing services.",
          bullet2:
            "Site Security: The information helps us for monitoring and security purposes, to protect the Site from threats and unwanted events.",
          bullet3:
            "Connecting with Third Parties: If you agree, we may share your information with third parties to provide additional services, all in accordance with the conditions detailed in this policy.",
          heading3: "Disclosure of Personal Information to Third Parties",
          para6:
            "The Company may disclose Personal Information to third parties in the following situations:",
          bullet4:
            "Related Services: We may share information with third parties providing services related to the Company’s activities. These third parties will work to protect your privacy in compliance with applicable privacy protection laws.",
          bullet5:
            "Law Enforcement: If required by law or court order, we will provide your Personal Information to the appropriate authorities.",
          heading4: "Changing or Deleting Personal Information",
          para7:
            "At any time, you may contact the Company at service.justagame@gmail.com and request to stop receiving emails or any other communication from the Company and/or suppliers and/or third parties and/or to delete your Personal Information from the Company’s records. You may also request access to the Personal Information you have provided to the Company or request correction and/or updating of this Personal Information.Note: Unless otherwise instructed, we may retain your Personal Information as long as it is reasonably necessary for the purposes for which it was collected, including but not limited to meeting requirements, obligations, or commitments.",
          heading5: "Security",
          para8:
            "The Company implements advanced technological and organizational measures to protect the security of your Personal Information, but it is important to remember that no security system is completely immune to breaches or unauthorized use.",
          heading6: "Third-Party Services",
          para9:
            "The Site may include links or use services of third parties. The Company is not responsible for the privacy policies of these third parties, and it is recommended to read their Terms of Use and Privacy Policies.",
          heading7: "Tracking Technologies (Cookies)",
          para10:
            "During your use of the Site, we or third parties may use industry-standard technologies known as “cookies,” Flash, or other tracking technologies (hereinafter: “Tracking Technologies”). These technologies are stored on your device and allow us to perform automated processes, such as automatic login to the Site, thus enhancing and simplifying your user experience.",
          para11:
            "You can disable Tracking Technologies through your browser settings. Most browsers allow you to delete cookies, block them, or set alerts before they are saved on your device.",
          para12:
            "However, remember that if you choose to delete or block Tracking Technologies, or change your Flash settings, your user experience on the Site may be limited. For more information on how to change these settings, please refer to the guides available in your browser or on the “Help” screen.",
          heading8: "Updates to the Privacy Policy",
          para13:
            "The Company may change the Privacy Policy from time to time, and it is recommended to visit this page periodically to stay updated on changes.",
          heading9: "Contact Us",
          para14:
            "If you have any questions or comments regarding the Privacy Policy, you can contact us at: service.justagame@gmail.com. We will make every effort to respond to you as soon as possible.",
          lastUpdate: "Last Updated Date: September 1, 2024",
        },
        // Privacy Policy page end
        // Cookie Policy page start
        cookiePolicy: {
          title: "Cookie Policy",
          para1:
            "This website is managed by Lavi Finance, which reserves the right to update this policy at any time by posting changes on this page. It is recommended to visit this page periodically to review the latest changes.",
          para2:
            "Cookies are small data files stored on your device while browsing the website. These files are used to monitor and analyze your activity on the Site and to improve the user experience. For more information on how cookies are used and how to control them, it is recommended to check your browser’s help file or visit http://www.aboutcookies.org.",
          para3:
            "We use cookies to identify users and track their activity on the Site. This allows us to better understand your needs and tailor content and services accordingly. Additionally, cookies may be used to display personalized advertisements and promotions relevant to your interests.",
          heading1: "Third-Party Users",
          para4:
            "We collaborate with third parties to collect information regarding Site usage, manage advertising operations, and improve the user experience. Third parties may use cookies to collect information about your activity on our Site and other sites.",
          heading2: "Data Analysis",
          para5:
            "We use data analysis services to measure Site usage, identify issues, and make improvements and adjustments based on the information collected.",
          heading3: "How to View and Manage Cookies",
          para6:
            "If you wish to check which cookies are stored in your browser or delete existing cookies, you can do so through your browser settings. Below are general guides for managing cookies in popular browsers:",
          bullet1: "Google Chrome:",
          line1:
            "Click “Tools” > “Settings” > “Advanced” > “Site Settings” > “Cookies and Site Data.”",
          bullet2: "Mozilla Firefox:",
          line2:
            "Click “Tools” > “Options” > “Privacy & Security” > “Browsing History” > “Settings” > “Show Cookies.”",
          bullet3: "Safari:",
          line3:
            "Click “Preferences” > “Privacy” > “Manage Website Data” > “Privacy.”",
          bullet4: "Internet Explorer:",
          line4:
            "Click “Tools” > “Internet Options” > “Privacy” > “Delete Cookies.”",
          heading4: "Ad Display and Redirecting to Another Address",
          para7:
            "When performing actions on the Site, such as making a purchase or registering, you will be required to agree to our Cookies Policy. If you do not agree, you will not be able to proceed with the relevant action on the Site.",
          heading5: "Changes to the Cookies Policy",
          para8:
            "We reserve the right to update our Cookies Policy as necessary. The last update date will be displayed in the policy so you can track any changes.",
          heading6: "Contact Us",
          para9:
            "If you have any questions or requests regarding our Cookies Policy, please contact us via email at: service.justagame@gmail.com.",
          para10: "Last Updated Date: September 1, 2024",
        },
        // Cookie Policy page end
        // Refund Policy page start
        refundPolicy: {
          title: "Refund Policy",
          heading1: "Refund Policy - Purchase of Courses and Subscriptions",
          para1:
            "The following policy describes the refund terms for purchasing digital courses or subscriptions on the platform (hereinafter: “the Services”). Payment for the Services is made in advance, before access to the digital content is granted (hereinafter: “the Payment”).",
          heading2: "Refund Policy for Digital Courses:",
          point1: "1. Cancellation of Purchase within 14 Days:",
          bullet1:
            "A user who purchased a digital course may cancel the purchase within 14 days from the purchase date, provided that access has not been granted to any part of the course. In the case of cancellation within the above period, the amount paid by the user will be refunded, minus a cancellation fee of 10% of the total Payment or the processing fees, whichever is lower.",
          point2: "2. Cancellation after Course Access:",
          bullet2:
            "If the user has started viewing any of the course content, no refund will be provided for the purchase, even on a proportional basis.",
          heading3: "Refund Policy for Subscriptions:",
          point3: "1. Cancellation of Subscription within 14 Days:",
          bullet3:
            "A user who purchased a subscription may cancel the subscription within 14 days from the purchase date, provided that the subscription services or any of the included course content have not been used. In the case of cancellation within the above period, the amount paid by the user will be refunded, minus a cancellation fee of 10% of the total Payment or the processing fees, whichever is lower.",
          point4: "2. Cancellation after Subscription Use:",
          bullet4:
            "If any of the subscription content or related services have been used, no refund will be given for the period used, and a proportional refund will be given only for the remaining unused period, subject to additional conditions as defined in the service.",
          heading4: "Additional Conditions:",
          bullet5:
            "Technical Prevention: In the case of technical issues that prevent access to course or subscription content, the user must report this immediately. In cases of issues that cannot be resolved by the Company, a refund may be considered, but the Company does not guarantee it.",
          bullet6:
            "Customer Service: For any questions or requests regarding the Refund Policy, please contact the customer service team at: service.justagame@gmail.com.",
          lastUpdate: "Last Updated Date: September 1, 2024",
        },
        // Refund Policy page end
        // Accessibility Statement page start
        accessibilityStatement: {
          title: "Accessibility Statement",
          para1:
            "Lavi Finance Ltd. is committed to ensuring that its learning platform (https://justagame.tech) is accessible to all users, including people with disabilities and older individuals. We believe that everyone should be able to browse our website effectively and comfortably, just like all other users. A study conducted by Microsoft in 2003 found that approximately 20-25% of the population encounters difficulties using the internet. These findings highlight the importance of more accessible websites, which assist people with various disabilities and those who use assistive technologies to operate computers and access information.",
          para2:
            "Just a Game is responsible for establishing and operating the website https://justagame.tech. We place great importance on providing equal service to all citizens and improving the service offered to citizens with disabilities.",
          para3:
            "We invest significant resources in making our website and digital assets accessible to make the company’s services more available to people with disabilities.",
          para4:
            "In Israel, approximately 20% of the population consists of individuals with disabilities who require digital accessibility to access general information and services.",
          para5:
            "The accessibility of Just a Game’s website is designed to make it more available, user-friendly, and convenient for populations with special needs, stemming from various disabilities, including motor impairments, cognitive disabilities, visual impairments, blindness or color blindness, hearing impairments, and senior citizens.",
          para6:
            "The website’s accessibility was implemented by the website accessibility company “Vee Web Accessibility.”",
          heading1: "Website Accessibility Level - AA",
          para7:
            "The company “Vee” adjusted the website’s accessibility for common browsers and mobile phone use as much as possible, using screen readers such as JAWS and NVDA in its tests.",
          para8:
            "The website complies with the requirements of the Israeli regulations for equal rights for people with disabilities, 5568, 2013, at level AA, and implements the recommendations of the WCAG 2.2 document by the W3C organization.",
          bullet1: "In Hebrew: Guidelines for Web Content Accessibility.",
          bullet2:
            "In English: Web Content Accessibility Guidelines (WCAG) 2.0.",
          para9:
            "The website’s accessibility was implemented according to the guidelines of the Israeli Government ICT Authority for accessible web applications.",
          heading2: "How to Enable Accessibility Mode",
          para10:
            "The website features an accessibility icon (typically located at the site’s edges). Clicking the icon allows you to open the accessibility menu. After selecting the appropriate function from the menu, wait for the page to load and display the desired change (if necessary).",
          para11:
            "To undo an action, click the function in the menu again. In any case, accessibility settings can be reset.",
          para12:
            "The software operates on popular browsers: Chrome, Firefox, Safari, Opera (subject to manufacturer conditions). For optimal browsing in accessibility mode, we recommend using the Chrome browser.",
          para13:
            "The site provides a semantic structure for assistive technologies and supports common keyboard navigation patterns using arrow keys, Enter, and Esc for exiting menus and popups.",
          para14:
            "For the best browsing experience with screen reading software, we recommend using the latest version of NVDA.",
          heading3: "Adjustments and Modifications Made on the Website",
          bullet3:
            "Screen Reader Compatibility: The website is adapted for assistive technologies such as NVDA and JAWS.",
          bullet4:
            "Simple and Clear Navigation: The navigation tools on the website are straightforward and intuitive.",
          bullet5:
            "Clear Content: The website’s content is written clearly, systematically, and hierarchically.",
          bullet6:
            "Browser Compatibility: The website is compatible with modern browsers.",
          bullet7:
            "Responsive Design: The website is adapted for display on a variety of screens and resolutions.",
          bullet8:
            "Consistent Page Structure: All pages on the website maintain a fixed structure (1H/2H/3H, etc.).",
          bullet9:
            "Alt Text for Images: All images on the website include alternative text descriptions (alt).",
          heading4: "Accessibility Software Functionality",
          bullet10:
            "Screen Reader Compatibility: The website is adapted for assistive technologies such as NVDA and JAWS.",
          bullet11:
            "Stop Animations: Stops moving elements and blocks animations.",
          bullet12:
            "Skip to Content: Allows users to skip the main menu and go directly to the content",
          bullet13:
            "Keyboard Navigation: The website is fully navigable using a keyboard.",
          bullet14:
            "Text Resize: Adjust text size by increasing or decreasing font size.",
          bullet15:
            "Spacing Adjustments: Adjust spacing between letters, words, or lines.",
          bullet16:
            "Contrast and Color Adjustments: Options for high contrast, inverted contrast, or black-and-white display.",
          bullet17:
            "Readable Fonts: The website offers easy-to-read font options.",
          bullet18:
            "Highlight Links: Highlights all links for better visibility.",
          bullet19: "Reading Guide: Adds a reading guide for easier focus.",
          bullet20:
            "Mouse Pointer Icon Change: Allows customization of the mouse pointer icon.",
          bullet21:
            "Image Descriptions: Provides text descriptions for images.",
          heading5: "Exceptions",
          para15:
            "It is important to note that despite our efforts to make all pages and elements on the website accessible, some sections or features may not be fully accessible or have yet to be made accessible.",
          para16:
            "We are continuously working to improve the accessibility of our website as part of our commitment to enabling all users, including people with disabilities, to use it.",
          heading6: "Contact Us Regarding Accessibility",
          para17:
            "If you encounter any accessibility issues on the website, we welcome your feedback and requests by contacting our Accessibility Coordinator. To help us address the issue effectively, please provide as much detail as possible:",
          bullet22: "Description of the issue.",
          bullet23: "The action you attempted to perform.",
          bullet24: "A link to the page you visited.",
          bullet25: "Browser type and version.",
          bullet26: "Operating system.",
          bullet27: "The assistive technology used (if applicable).",
          para18:
            "Just a Game will make every effort to improve the website’s accessibility and respond to inquiries professionally and promptly.",
          heading7: "Accessibility in Physical Facilities",
          para19:
            "It is important to note that Lavi Finance provides financial services through various channels and adapts its service delivery methods for all types of customers. Under the online learning platform service, there is no physical customer reception, and we are available through digital channels.",
          heading8: "Accessible Customer Service",
          para20:
            "We are committed to providing accessible and tailored services to all our customers, emphasizing a service experience that respects the unique needs of people with disabilities.",
          bullet28:
            "Employee Training for Accessible Service: Our staff undergoes ongoing training on accessibility. These training sessions focus on a deep understanding of the accessibility field, raising employee awareness, and providing practical tools for accessible and high-quality service.",
          bullet29:
            "Accessible Telephone Service: Our telephone service is adapted to meet the needs of people with disabilities and features no background music, ensuring that information is conveyed in an accessible and understandable way.",
          bullet30:
            "Additional Contact Methods: We offer several alternative ways to contact our customer service to ensure that everyone can reach us conveniently:",
          bullet31: "Email: service.justagame@gmail.com",
          bullet32: "WhatsApp: 052-6313988",
          line1: "Accessibility Coordinator",
          line2: "Name: Shachar",
          line3: "Phone: 052-6313988",
          line4: "Email: service.justagame@gmail.com",
          lastUpdate: "Last Updated Date: November 18, 2024",
        },

        // Accessibility Statement page end
        // Frequently Asked Question page start
        faqSection: {
          title: "Frequently Asked Question",
          question1: "What is the platform, and who is it intended for?",
          answer1:
            "Our platform is an online learning system designed for students and teachers who want to learn or teach professional courses in a simple and convenient way.",
          question2: "How can I register for the platform?",
          answer2:
            "You can register by clicking the sign-up button on the homepage, selecting whether you are a student or a teacher, and filling in the required details.",
          question3: "What types of courses are available on the platform?",
          answer3:
            "The platform offers a wide range of professional courses in various fields, including technology, business, management, marketing, real estate brokerage, and more.",
          question4: "Can I download study materials from the course?",
          answer4:
            "Yes, in most courses, you can download study materials and additional support for further review outside the platform.",
          question5: "What should I do if I forget my password?",
          answer5:
            "If you forget your password, you can reset it by clicking the “Forgot Password” button on the login page, and we will send you instructions to reset it via email.",
          question6: "Is there technical support on the platform?",
          answer6:
            "Of course, we offer technical support. You can leave a message on the “Contact Us” page, choose the type of issue (technical support, account, payment problem, etc.), and we will get back to you as soon as possible.",
          question7: "How can I purchase a course?",
          answer7:
            "After finding the desired course, simply click the purchase button, choose one of the three available payment methods, and confirm your purchase.",
          question8: "Are the courses time-limited?",
          answer8:
            "Any course you purchase will be available for viewing for 3 months from the date of purchase, allowing you to learn at your own pace.",
          question9: "Can I get a discount on courses?",
          answer9:
            "Yes, you can use discount codes if you have one😉. Simply enter the code during purchase and ensure it’s valid.",
          question10: "How can teachers create a new course on the platform?",
          answer10:
            "Teachers can create new courses by accessing the teachers’ area on the platform, where they can upload study materials, add exams, and manage the course content easily and intuitively.",
        },
        // Frequently Asked Question page end

        // student faq start
        studentFaq: {
          question1: "How do I start a course I registered for?",
          answer1:
            "Go to your personal area, click on “My Courses,” and select the course you wish to start. On the course page, you can access quizzes, summaries, and theoretical materials.",
          question2: "How can I see my progress in the course",
          answer2:
            "On the course page, there is a Course Summary Dashboard where you can view all your course-related data.",
          question3: "How do I submit a technical support request?",
          answer3:
            "In the top menu, click on “Technical Support.” You will be directed to the support page, and if you don’t find an answer, you can open a chat with a representative.",
          question4: "Can I download the summaries to my computer?",
          answer4:
            "No, downloading or taking screenshots of the summaries is not allowed as it violates copyright policies.",
          question5: "Can I mark a summary as completed?",
          answer5:
            "On the Summaries page, there is a “Like” button. You can click on it to mark the summary as read and understood.",
          question6: "I can’t apply a coupon code. What should I do?",
          answer6:
            "Ensure the coupon is valid and hasn’t expired. If the issue persists, contact technical support via chat.",
          question7: "How is my course progress calculated?",
          answer7:
            "The system calculates your progress in the following way:Half of the score is based on the number of summaries you’ve completed out of the total summaries.The other half is based on the number of quizzes you’ve completed out of the total quizzes.",
          question8: "How do I see my course progress?",
          answer8:
            "On the “My Courses” page, the course displays the percentage of progress directly on the course card.",
          question9: "I can’t upload a profile picture. What should I do?",
          answer9:
            "Ensure the image is in JPEG or PNG format and smaller than 2MB. If the problem persists, try using a different browser.",
          question10:
            "I have a question for the course instructor. How can I contact them?",
          answer10:
            "On the course page, you’ll find the instructor’s name along with a button to contact them.",
        },
        // student faq end

        // teacher faq start
        teacherFaq: {
          question1: "How do I create a new course?",
          answer1:
            "In the main menu, click on “Create Course,” and upload materials, summaries, and quizzes in the appropriate sections.",
          question2: "Why can’t I edit a quiz I created?",
          answer2:
            "After creating a quiz, you can’t edit it from the editing page. You can only make changes within the quiz itself, such as editing the answers and questions. However, you cannot add or remove questions or change the order of the correct answers.",
          question3: "How do I share my course with students?",
          answer3:
            "After publishing the course, you can share the course link.",
          question4: "How can I edit a summary after creating a course?",
          answer4:
            "Go to the course editing page, enter the Summaries section, select the summary you want to edit, and you can make changes there.",
          question5: "How do I add a summary to a course?",
          answer5:
            "On the course editing page, go to the “Summaries” menu, click on “Add Summary,” and upload the file or add text.",
          question6:
            "How do I know how many students are enrolled in my course?",
          answer6:
            "In the teacher’s dashboard, you can see the number of students enrolled in each course.",
          question7: "Why can’t I upload an image to the course page?",
          answer7:
            "Make sure the image is in the correct format (JPEG or PNG) and smaller than 5MB. If the problem persists, try uploading a different image.",
          question8: "How do I change the course end date?",
          answer8:
            "It is not possible to change the course end date. All courses are set to 3 months by default.",
          question9: "How do I get feedback from students?",
          answer9:
            "On the course page, there is an option for student reviews, which will also appear on the main page.",
          question10: "How many courses can I open?",
          answer10: "There is no limit to the number of courses you can open.",
        },
        // teacher faq end

        // Login form start
        loginForm: {
          welcome: "Welcome Back!",
          prompt: "Enter your username and password to log in",
          emailLabel: "Email Address",
          emailPlaceholder: "name@mail.com",
          passwordLabel: "Password",
          passwordPlaceholder: "*********",
          rememberMe: "Remember me",
          forgotPassword: "Forgot Password?",
          loginButton: "Log in",
          registerPrompt: "Don't you have an account?",
          registerLink: "Register",
        },

        // Login form end
        // Registration form start
        countries: {
          US: "United States (+1)",
          PK: "Pakistan (+92)",
          IN: "India (+91)",
          IL: "Israel (+972)",
          UK: "United Kingdom (+44)",
          AU: "Australia (+61)",
          JP: "Japan (+81)",
        },

        registrationLogin: {
          registerTitle: "Register",
          loginPrompt: "Already have an account?",
          loginButton: "Log in",
          student: "I'm Student",
          teacher: "I'm Teacher",
          firstNameLabel: "First Name",
          firstNamePlaceholder: "Eric",
          lastNameLabel: "Last Name",
          lastNamePlaceholder: "Einstein",
          usernameLabel: "Username",
          usernamePlaceholder: "ArikTheGenius",
          emailLabel: "Email Address",
          emailPlaceholder: "example@mail.com",
          passwordLabel: "Password",
          passwordPlaceholder: "******",
          countryLabel: "Country Code",
          phoneNumberLabel: "Phone Number",
          phoneNumberPlaceholder: "052-110-1998",
          termsParaOne: "I agree to the ",
          termsParaTwo: "Terms of Service ",
          termsParaThree:
            " and acknowledge receiving newsletters and promotional emails from Just A Game.",
          registerButton: "Register",
          signInWithGoogleButton: "Sign In With Google",
        },
        // Registration form end

        //forgot password form start
        forgotPassword: {
          title: "Forgot Password",
          prompt: "Enter your registered email to reset your password",
          emailLabel: "Email",
          emailPlaceholder: "name@mail.com",
          continueButton: "Continue",
        },
        // forgot password form end
        // verified otp form start
        otpVerification: {
          title: "OTP Verification",
          description: "We've sent an OTP to your email, please verify it",
          continueButton: "Continue",
          otpMessage:
            "If you haven’t received the email, please check your spam folder🧐",
        },
        // verified otp form end
        // New Password form start
        newPassword: {
          title: "New Password",
          description: "Enter your new password to reset your password.",
          newPasswordLabel: "New Password",
          newPasswordPlaceholder: "*********",
          confirmPasswordLabel: "Confirm Password",
          confirmPasswordPlaceholder: "*********",
          continueButton: "Continue",
        },
        // New password form end
        // Wait for Approval Section start
        waitForApproval: {
          title: "Wait for Approval",
          message:
            "Thank you for registering. We will review your request and get back to you within 1 working day. You will receive an email once your request is approved.",
          logoutButton: "Logout",
        },
        // Wait for Approval Section end
        // student Sidebar Section start
        studentPersonalArea: {
          title: "Personal Area",
          myCourses: "My Courses",
          home: "Home",
          search: "Search",
          support: "Support",
          logout: "Log out",
        },
        // student Sidebar Section end
        // student profile Section start
        studentprofile: {
          deleteAccount: "Delete Account",
          editProfile: "Edit Profile",
          coursesEnrolled: "Courses I'm Enrolled In",
          seeAll: "See all",
        },
        // student profile Section end
        // Student Profile Update Section start
        profileUpdate: {
          firstName: "First Name",
          lastName: "Last Name",
          username: "Username",
          email: "Email",
          phoneNumber: "Phone Number",
          countryCode: "US (+1)",
          updateProfile: "Update Profile",
          changePassword: "Change Password",
          oldPassword: "Old Password",
          newPassword: "New Password",
          confirmPassword: "Confirm Password",
          update: "Update",
        },
        // Student Profile Update Section end
        // Student Course Detail Section start
        studentCourseDetail: {
          summaryProgress: "Summary Progress",

          contactTeacher: "Contact Teacher",
          aboutTheCourse: "About the Course",
          about: "About",
          theoreticalMaterial: "Theoretical Material",
          summaries: "Summaries",
          exams: "Exams",
          resourceFolder: "Resource Folder",
          extraMaterial: "Extra Material",
          courseSummary: "Course Summary",
          testAnswered: "Test Answered",
          averageGrade: "Average Grade",
          averageTimeToAnswer: "Average Time to Answer",
          remainingTime: "Remaining Time",
          months: "months",
          days: "days",
          hours: "hours",
          minutes: "minutes",
          seconds: "seconds",
          reviewsAboutCourse: "Reviews about the course",
          more: "More",
          leaveFeedback: "Leave Feedback",
        },
        // Student Course Detail Section end

        // Summaries Section Start
        summaries: "Summaries",
        // Summaries Section end

        //summaryTitle Section Start
        summaryTitle: "Summary Title",
        //summaryTitle Section end

        // exams Section Start
        exams: "Exams",
        // exams Section end

        // examName Section Start
        examName: "Exam Name",
        // examName Section end

        // answerAndLearn Section Start
        reviewIncorrect: "Review Incorrect Answers",
        answerAndLearn: "View Answers & Learn",
        search: "Search",
        // answerAndLearn Section end

        // takeExam Section Start
        takeExam: {
          of: "מתוך",
          title1: "Start Exam , Good Luck",
          title: "Take the Exam",
          number: "1 of 20",
          button1: "Close",
          button2: "Next",
        },
        // takeExam Section end

        // examMarks Section Start
        examMarks: {
          title: "Congratulations! You have completed the exam.",
          score: "Score",
          button1: "View Wrong Questions",
          button2: "Back to Exams",
          button3: "Back to Home",
        },
        // examMarks Section end

        // wrongQuestion Section Start
        wrongQuestion: {
          title: "Questions I Got Wrong",
          button1: "Close",
          button2: "Next",
        },
        // wrongQuestion Section end

        // theoreticalMaterial Section Start
        theoreticalMaterial: "Theoretical Material",
        // theoreticalMaterial Section end

        // resourceFolder Section Start
        resourceFolder: "Resource Folder",

        // resourceFolder Section end

        // Teacher sidebar start
        teacherSideBar: {
          home: "Home",
          myCourses: "My Courses",
          myProfile: "My Profile",
          myAccount: "My Account",
          support: "Support",
          logOut: "Log out",
        },
        // Teacher sidebar end
        // Teacher Dashboard start
        teacherDashboard: {
          hi: "Hi",
          averageRating: "Average Rating & Breakdown",
          reviews: "Reviews",
          totalCourses: "Total Courses",
          totalStudents: "Total Students",
          myCourses: "My Courses",
          seeAll: "See All",
        },
        // Teacher Dashboard end
        //Teacher my courses start
        teacherMyCourses: {
          myCourses: "Courses",
          newCourse: "New Course",
        },
        //Teacher my courses end
        // Teacher Course Detail start
        teacherCourseDetail: {
          about: "About",
          theoreticalMaterial: "Theoretical Material",
          summaries: "Summaries",
          exams: "Exams",
          resourceFolder: "Resource Folder",
          aboutTheCourse: "About the Course",
          editCourse: "Edit Course",
          active: "Active",
          inActive: "in Active",
          reviewsAboutCourse: "Reviews about the course",
          more: "More",
        },
        // Teacher Course Detail end
        // Teacher Create Course start
        teacherCreateCourseStep1: {
          uploadTopicImage: "Upload Topic Image",
          noFileChosen: "No file chosen",
          tapToChooseImage: "Tap to Choose Image",
          courseName: "Course Name",
          price: "Price",
          shortDescription: "Short Description",
          characterCount: "0/400",
          selectTopic: "Select Topic",
          selectSubtopic: "Select Subtopic",
          selectSubSubtopic: "Select Sub-Subtopich",
          previous: "Previous",
          next: "Next",
        },
        teacherCreateCourseStep2: {
          name: "Name",
          link: "Link",
          add: "Add",
          submit: "Submit",
          message: "Price must be between 50 and 200",
          theoreticalMaterialLink: "Theoretical Material Link",
          theoreticalMaterialLinkDescription:
            "Enter name|link separated by commas",
          theoreticalMaterialLinkHint:
            "Separate each name|link pair with a comma.",
          auxiliaryMaterialLink: "Auxiliary Material Link",
          auxiliaryMaterialLinkDescription:
            "Enter name|link separated by commas",
          auxiliaryMaterialLinkHint:
            "Separate each name|link pair with a comma.",
          previous: "Previous",
          next: "Next",
        },
        teacherCreateCourseStep3: {
          summaryTitle: "Summary Title",
          summaryContent: "Summary Content",
          add: "Add",
          summaries: "Summaries",
          previous: "Previous",
          next: "Next",
          defineExam: "Define Exam",
          noCourse: "No exams are added yet.",
          create: "Create",
          creating: "Creating",
          remove: "Remove",
        },
        teacherCreateCourseStep4no1: {
          examName: "Exam Name",
          add: "Add",
          definedExams: "Defined Exams",
          noExamsAvailable: "No exams available",
          previous: "Previous",
          next: "Next",
        },
        teacherCreateCourseStep4no2: {
          finishExam: "Finish Exam",
          finishExamDescription: "Hit the submit button to save the course",
          previous: "Previous",
          submit: "Submit",
        },
        // Teacher Create Course end
        // Teacher Profile section start
        teacherProfile: {
          expertise: "Expertise",
          bio: "About You",
          deleteAccount: "Delete Account",
          editProfile: "Edit Profile",
          firstName: "First Name",
          firstNameValue: "Dr John",
          lastName: "Last Name",
          lastNameValue: "Mohsin",
          username: "Username",
          usernameValue: "mohsin123",
          email: "Email",
          emailValue: "john@gmail.com",
          phoneNumber: "Phone Number",
          countryCode: "US (+1)",
          enterPhoneNumber: "Enter phone number",
          updateProfile: "Update Profile",
          changePassword: "Change Password",
          oldPassword: "Old password",
          newPassword: "New password",
          confirmPassword: "Confirm password",
          update: "Update",
        },
        // Teacher Profile section end
        // Delete Account Modal section start
        deleteAccountModal: {
          title: "Are you sure you want to delete your account?",
          description:
            "By deleting your account, you will lose access to your courses. However, please note the following:",
          point1:
            "All your course progress, test results, and personal data will be permanently removed.",
          point2:
            "You will no longer have access to the courses you've enrolled in.",
          point3: "This action cannot be undone.",
          proceedMessage:
            "If you're certain you want to proceed, click 'Delete Account'.",
          cancelMessage:
            "If you'd like to keep your account and retain access to your courses, click 'Cancel'.",
          deleteAccount: "Delete Account",
          close: "Close",
        },
        // Delete Account Modal section end
        // Admin sidebar start
        adminSidebar: {
          home: "Home",
          topics: "Topics",
          teachers: "Teachers",
          students: "Students",
          blogs: "Blogs",
          courses: "Courses",
          coupon: "Coupon",
          myProfile: "My Profile",
          subscribedUsers: "Subscribed Users",
          logOut: "Log out",
        },
        // Admin Sidebar end
        // Admin Dashboard Start
        adminDashboard: {
          overAllEarning: "Overall Earning",
          totalCourses: "Total Courses",
          totalStudents: "Total Students",
          totalTeachers: "Total Teachers",
          courses: "Courses",
          seeAll: "Seen All",
        },
        // Admin Dashboard end
        // Admin my courses start
        adminMyCourses: {
          myCourses: "My Courses",
          newCourse: "New Course",
        },
        // Admin my courses end
        //Admin Course Detail start
        adminCourseDetail: {
          about: "About",
          theoreticalMaterial: "Theoretical Material",
          summaries: "Summaries",
          exams: "Exams",
          resourceFolder: "Resource Folder",
          aboutTheCourse: "About the Course",
          editCourse: "Edit Course",
          active: "Active",
          reviewsAboutCourse: "Reviews about the course",
          more: "More",
        },
        //Admin Course Detail end
        // Admin Create Course start
        adminCreateCourseStep1: {
          uploadTopicImage: "Upload Topic Image",
          noFileChosen: "No file chosen",
          tapToChooseImage: "Tap to Choose Image",
          courseName: "Course Name",
          price: "Price",
          shortDescription: "Short Description (0/400)",
          selectTopic: "Select Topic",
          selectSubtopic: "Select Subtopic",
          selectSubSubtopic: "Select Sub-Subtopic",
          previous: "Previous",
          next: "Next",
        },
        adminCreateCourseStep2: {
          theoreticalMaterialLink: "Theoretical Material Link",
          enterNameLink: "Enter name|link separated by commas",
          auxiliaryMaterialLink: "Auxiliary Material Link",
          separatePairs: "Separate each name|link pair with a comma",
          previous: "Previous",
          next: "Next",
        },
        adminCreateCourseStep3: {
          summaryTitle: "Summary Title",
          summaryContent: "Summary Content",
          addSummaries: "Add Summaries",
          previous: "Previous",
          next: "Next",
        },
        adminCreateCourseStep4no1: {
          examName: "Exam Name",
          addDefinedExams: "Add Defined Exams",
          noExamsAvailable: "No exams available",
          previous: "Previous",
          next: "Next",
        },
        adminCreateCourseStep4no2: {
          finishExam: "Finish Exam",
          submitButtonText: "Hit the submit button to save the course",
          previous: "Previous",
          submit: "Submit",
        },
        // Admin Create Course end
        // Coupon Start
        coupon: {
          couponTitle: "Coupon",
          addCoupon: "Add Coupon",
        },
        // Coupon end
        // Create Coupn Start
        createCoupon: {
          title: "Create Coupon",
          titlePlaceholder: "Coupon Code",
          discountPercent: "Discount %",
          discountPercentPlaceholder: "Discount %",
          expirationDate: "Expiration Date",
          expirationDatePlaceholder: "mm/dd/yyyy",
          createButton: "Create",
        },
        // Create Coupn end
        // Teachers Section Start
        teachers: {
          title: "Teachers",
          name: "Name",
          phone: "Phone",
          email: "Email",
          status: "Status",
          action: "Action",
        },
        // Teachers Section End
        // Students Section Start
        students: {
          title: "Students",
          name: "Name",
          phone: "Phone",
          email: "Email",
          action: "Action",
        },
        // Students Section End
        // topics Start
        topics: {
          title: "Topics",
          newTopic: "New Topics",
        },
        // topics End
        // Sub-topics start
        subtopics: {
          title: "Subtopics",
          newSubTopic: "New Sub Topics",
        },
        // Sub-topics end
        // Sub sub-topics start
        subSubtopics: {
          title: "Sub Subtopics",
          newSubSubTopic: "New Sub-SubTopic",
        },
        // Sub sub-topics end

        // for add new topic modal start
        addNewTopic: {
          heading1: "Add New Topic",
          heading2: "Add New Subtopic",
          heading3: "Add New Sub-Subtopic",
          editTopic1: "Edit Topic",
          editTopic2: "Edit Subtopic",
          editTopic3: "Edit Sub-Subtopic",
          title: "Title",
          description: "Description",
        },
        // for add new topic modal end
        // topic, subtopic and sub subtopic modal buttons start
        modalButtons: {
          addTopic: "Add topic",
          addSubtopic: "Add Subtopic",
          addSubSubtopic: "Add Sub Subtopic",
          cancel: "Cancel",
        },
        // topic, subtopic and sub subtopic modal buttons end

        pleaseWait: "Please wait ...",
        loading: "Loading ...",
        question: "Question",
        wrongQuestion: "Wrong Question",
        btnOne: "Start Animation",
        btnTwo: "Stop Animation",
        addNewExam: "+ Add New Exam",
        saveExam: "Save Exam",
        saving: "Saving ...",
        createSummaries: "+ Create Summaries",
        viewContent: "View Content",
        hideContent: "Hide Content",
        //after login faqs
        helpful: "Was this answer helpful?",
        back: "Back",
        yes: "Yes",
        no: "No",
        openChat: "Open Chat",
        chatHelp: "Need more help? Chat with our support.",
        feedBack: "Thank you for your feedback!",
        // for blogs page
        blogs: {
          heading: "Blogs",
          readMore: "Read More",
        },
        blogsSidebar: {
          heading: "Categories",
        },
        // for Add blogs page
        addBlogs: {
          submitting: "Submitting",
          success: "Blog Added",
          heading: "Add New Blog",
          title: "Title",
          titlePlaceholder: "Enter Blog Title",
          image: "Thumbnail Image",
          imagePlaceholder: "Thumbnail Image",
          category: "Select Category",
          categoryPlaceholder: "Select a Category",
          tags: "Tags",
          tagsPlaceholder: "Enter tags, press Enter or comma to add",
          description: "Blog Description",
          descriptionPlaceholder: "Description",
          btn: "Add Blog",
        },
        // for blogstable page
        blogsTable: {
          heading1: "Image",
          heading2: "Name",
          heading3: "Description",
          heading4: "View Detail",
          heading5: "Actions",
          addCategory: "Add Category",
        },
        //for edit blog modal
        editBlogModal: {
          title: "Edit Blog",
          titleLabel: "Blog Title",
          descriptionLabel: "Blog Description",
          saveChanges: "Save Changes",
          close: "Close",
        },
        // for Add category page
        addCategory: {
          heading: "Add New Category",
          title: "Title",
          titlePlaceholder: "Enter Category Title",
          description: "Category Description",
          descriptionPlaceholder: "Description",
          btn: "Add Category",
          loading: "Please Wait ...",
          successMessage: "Category Added",
        },
        // for editAbleModal
        editableModal: {
          title: "Edit Item",
          cancel: "Cancel",
          save: "Save",
          areYouSure: "Are you sure you want to delete",
          delete: "Delete",
          thisItem: "this item",
          actionCannotBeUndone: "This action cannot be undone.",
        },
        // for my account page start
        purchase: "Purchases",
        courses: "Courses",
        getInTouch: "Get In Touch",
        // for my account page end
      },
    },
    he: {
      translation: {
        imageSize: "נא להעלות תמונה בגודל של פחות מ-1MB",
        noBlogsYet: "אין בלוגים עדיין",
        editExam: "ערוך בחינה",
        noExamYet: "עדיין אין בחינות",
        nosummariesyet: "עדיין אין סיכומים",
        editCourseModalTitle: "לערוך קורס",
        summaryTxt: "סמן סיכום זה כהושלם כדי לחשב את התקדמות הקורס שלך.",
        veeCode: "וי קוד",
        // landing page start
        seeAll: "ראה הכל",
        courseDetailsHeading: "הגדרת פרטי הקורס",
        uploadMaterialHeading: "העלאת חומרים",
        defineSummariesHeading: "הגדרת סיכומים",
        defineExamsHeading: "הגדרת מבחנים",
        examDetailHeading: "הגדרת פרטי המבחן",
        defineQuestionHeading: "הגדרת שאלות למבחן",
        editCourseHeading: "עריכת קורס",
        createCourseHeading: "יצירת קורס",
        noRatingsYet: "אין דרוגים כרגע",
        averageRatings: "ממצוע דירוגים וביקורות",
        totalCourse: "כל הקורסים",
        totalStudents: "כל הסטודנטים",
        coursesCount: "קורסים",
        extraMaterialHeading: "חומר תיאורטי",
        wrongQuestiontitle: "שאלות שטעיתי בהן",
        scoreTxt: "ציון",

        needHelp: "צריך עזרה؟",
        closeBtn: "סגור",
        hint: "רמז",
        Filter: "סינון",
        Topics: "נושא",
        Subtopics: "תת נושא",
        SubsubTopics: "תת תת נושא",
        Apply: "חפש",
        SearchResults: "תוצאות חיפוש",
        home: "בית",
        applyCoupon: "אמת קוד קופון",
        buyCourse: "רכישת קורס",
        about: "אודות",
        reviews: "ביקורות",
        personalArea: "אזור אישי",
        noCourseFound: "לא נמצאו קורסים לנושא הנבחר.",
        recomendedCourses: "קורסים מומלצים",
        startNow: "התחל עכשיו",
        popularTopic: "נושאים פופולריים",
        contact: "צור קשר",
        dashboard: "לוח מחוונים",
        logout: "להתנתק",
        login: "התחבר",
        signup: "הרשמה",
        hero: {
          title: "ללמוד בכל מקום ובכל זמן",
          description: "קל ללמוד ולהצליח עם שיטה בדוקה.",
          searchPlaceholder: "חפש",
        },
        reviews: {
          title: "ביקורות",
          subtitle: "ראו מה יש לתלמידים שלנו לומר",
          reviewsList: [
            {
              name: "ריקי ברגל",
              title: "רופאת נשים",
              content:
                " תוכן איכותי ונגיש לילדים במחיר הוגן. הילדים שלי נהנים ללמוד מכל תחום - מתיאוריה ועד מתמטיקה, והכל מסודר וברור. זה פתרון מושלם שמאפשר להם ללמוד בזמנם הפנוי. אני כבר לא יכולה לחכות שיגיעו לשלב שבו יוכלו ללמוד לצו הראשון דרך הפלטפורמה הזאת",
            },
            {
              name: "שקד רוט",
              title: "מנהל תיקי לקוחות, אנרגיה ירוקה",
              content:
                "בתחום שלי, אני כל הזמן צריך ללמוד דברים חדשים, והמערכת הזאת ממש הפתיעה אותי לטובה. הכל מסודר וברור, וזה עוזר לי ללמוד בקצב שלי ובזמן שנוח לי. אני אוהב במיוחד איך שהיא משלבת בין תיאוריה לבין כלים מעשיים שבאמת עוזרים לי בעבודה.",
            },
            {
              name: "נוי צימר",
              title: "מהנדסת מערכות מידע",
              content:
                "בתור מהנדסת, אני רגילה לעבוד עם מערכות מורכבות, אבל המערכת הזאת באמת הפתיעה אותי. הכל אינטואיטיבי, נוח, ומותאם לכל סוגי המשתמשים. אני אוהבת במיוחד את הסיכומים שמקצרים לי זמן ואת המבחנים שעוזרים לי להתכונן בצורה הכי טובה שיש. ממליצה בחום!",
            },
            {
              name: "כיואן אמר",
              title: "מהנדס בניין",
              content:
                "בתור מהנדס בניין, אני יודע כמה חשוב ללמוד בצורה מסודרת ולהתמקד בדברים החשובים באמת. המערכת הזאת מצליחה בדיוק בזה – היא עוזרת לי לארגן את הלמידה שלי ומציגה הכל בצורה ברורה ונגישה. המבחנים והסיכומים מעולים, ואני ממליץ עליה לכל מי שרוצה ללמוד בצורה חכמה ויעילה",
            },
            {
              name: "אגם וזאנה",
              title: "תלמידת תיכון, מאפרת",
              content:
                "כבחורה שלומדת בתיכון, עובדת כמאפרת ומתכוננת למבחנים שונים כל הזמן, המערכת הזאת עזרה לי בכל כך הרבה תחומים! בזכותה הצלחתי להתכונן בקלות למבחנים בבית הספר, לומדת עכשיו למבחן התיאוריה לנהיגה, ומתכננת ללמוד לצו הראשון בדיוק ככה. הכל מסודר, ברור ונוח, ואני מצליחה ללמוד בזמן שלי בלי לחץ. ממליצה לכל אחד ואחת!",
            },
            {
              name: "יובל בן פורת",
              title: "מהנדס בניין",
              content:
                "בתור מהנדס בניין, אני כל הזמן מחפש כלים שעוזרים לי ללמוד בצורה יעילה וממוקדת. המערכת הזאת ענתה לי על כל הצרכים – הסיכומים מסודרים וברורים, המבחנים מותאמים בצורה שמאפשרת ללמוד ולשפר, והיא עוזרת לי לחסוך זמן ולהתמקד בעיקר. פתרון מצוין לכל מי שרוצה ללמוד בצורה חכמה",
            },
            {
              name: "אוריה זכאי",
              title: "מנהלת סושיאל",
              content:
                "בתור מנהלת סושיאל עם לוח זמנים עמוס, המערכת הזאת היא בדיוק מה שהייתי צריכה. היא מספקת לי גישה לתוכן מקצועי בצורה נוחה ומסודרת, ועוזרת לי ללמוד דברים חדשים בקצב שלי. אני במיוחד אוהבת את הסיכומים הברורים והמבחנים שמוודאים שהבנתי הכל. ממליצה בחום!",
            },
            {
              name: "משה דגן",
              title: "מתכנן עירוני",
              content:
                "כמתכנן עירוני, אני מעריך גישה למידע שמסודר בצורה ברורה ומדויקת. המערכת הזאת נותנת בדיוק את זה – סיכומים ממוקדים, מבחנים שמחדדים את הידע, וכלים שעוזרים ללמוד בצורה אפקטיבית. היא חוסכת לי זמן ומאפשרת לי להתמקד במה שבאמת חשוב. ממליץ בחום לכל מי שמחפש פתרון לימודי איכות",
            },
            {
              name: "עמית אברהמי",
              title: "מנהל מכירות בפיליפינים",
              content:
                "בתור מנהל מכירות בחו”ל עם לוח זמנים צפוף, המערכת הזאת היא בדיוק מה שהייתי צריך. היא מאפשרת לי ללמוד בצורה מסודרת, בלי לבזבז זמן מיותר. התכנים ברורים, הסיכומים מעולים, והמבחנים עוזרים לוודא שאני באמת מבין את החומר. פתרון מושלם למי שרוצה ללמוד ביעילות, גם כשנמצאים בצד השני של העולם",
            },
            {
              name: "יואב פרץ",
              title: "בעל עסק, שף פרטי",
              content:
                "בתור בעל עסק ושף פרטי, הזמן שלי יקר, והמערכת הזאת עזרה לי לנצל אותו בצורה הכי טובה שיש. היא מספקת לי גישה לתכנים איכותיים בצורה ברורה ומסודרת, ומאפשרת לי ללמוד בזמני הפנוי, בין הזמנות לאירועים. הסיכומים והכלים המעשיים שמציעה המערכת פשוט שידרגו אותי. ממליץ בחום לכל מי שמחפש פתרון לימודי נוח ואפקטיבי",
            },
          ],
        },
        aboutSection: {
          title: "קצת עלינו",
          para1:
            "אצלנו תוכלו להעשיר את הידע  בצורה היעילה ביותר.  הקורסים שלנו מתוכננים כך שתוכלו ללמוד בכל מקום ובכל זמן, עם גישה קלה לתוכן. בין אם אתם סטודנטים, מורים, או כל מי שרוצה להעשיר את הידע, אנחנו דאגנו שהמסלול יהיה ברור והחוויה תהיה  פשוטה ונוחה.",
          para2:
            "הקורסים שלנו עוצבו במיוחד עבור אלו שאוהבים ללמוד בכל מקום—בין אם זה בספה, במשרד, או אפילו תוך כדי תור בסופר. ובינינו, אם אתם לומדים בזמן שאתם פותחים את הבוקר, אז אנחנו עשינו את העבודה שלנו נכון!",
          para3:
            "אז קחו לכם מקום נוח, הכינו את הקפה או התה (או הבירה, לא נשפוט), והתחילו ללמוד בקצב שלכם.  אל תשכחו, אנחנו כאן ללמד אתכם, ולוודא שתרגישו חכמים ומלאי מוטיבציה בכל צעד.",
        },
        footerSection: {
          logoDescription: "קל ללמוד ולהצליח עם שיטה בדוקה.",
          legalMatters: "עניינים משפטיים",
          termsOfUse: "תנאי שימוש",
          privacyPolicy: "מדיניות פרטיות",
          cookiePolicy: "מדיניות קובצי Cookie",
          refundPolicy: "מדיניות החזר כספי",
          accessibilityStatement: "הצהרת נגישות",
          contactUs: "צור קשר",
          email: "service.justagame@gmail.com",
          faqs: "שאלות נפוצות",
          subscribeTitle: "הירשם לניוזלטר שלנו",
          subscribeDescription:
            "הירשמו על מנת לקבל את ההנחות המוגבלות על הקורסים הכי שווים לפני כולם",
          enterEmail: "הזן אימייל",
        },
        // landing page end
        // terms of use page start
        termsOfUse: {
          title: "תנאים והגבלות",
          heading: "תנאי שימוש",
          para1:
            'לביא פיננסים (להלן ובהתאמה: "החברה" או "אנחנו") מספקת ללקוחותיה פלטפורמה טכנולוגית ללמידה מקוונת באמצעות קורסים מקצועיים המוצעים באתר https://justagame.tech/  (להלן: "האתר"). כל שימוש באתר ובשירותים המוצעים באתר על ידי המשתמש (להלן: "המשתמשים" או "אתה"), ייעשה בהתאם ובכפוף לתנאים ולהוראות האמורות בתנאי שימוש אלה.',
          point1: [
            {
              heading: "1. אנא קרא בעיון את התנאים לפני השימוש באתר.",
              para1:
                'אנא קרא בעיון את התנאים לפני השימוש באתר. בעצם התחברותך לאתר ו/או שימוש בכלים ושירותים המוצעים באתר ו/או פתיחת החשבון באתר, הנך מאשר כי קראת והבנת את תנאי השימוש הבאים, לרבות התנאים המפורטים במדיניות הפרטיות של החברה, אשר זמינים בלינק https://justagame.tech/privacy-policy , המהווים חלק בלתי נפרד מתנאי השימוש (להלן, ביחד: "התנאים").',
              para2:
                "אתה מסכים כי כמשתמש באתר התנאים יחייבו אותך וכי תפעל בהתאם לכל הדינים והתקנות החלים בקשר לשימוש באתר. הנך מאשר בזאת כי התנאים מהווים הסכם משפטי מחייב וניתן לאכיפה בין החברה לבינך.",
              para3:
                "אם אינך מסכים לאי אילו מתנאי השימוש המפורטים להלן, הנך מחויב, באופן מיידי, להימנע מכניסה, מהתחברות או מלעשות שימוש בשירותים המוצעים באתר. התנאים מנוסחים בלשון זכר לצרכי נוחות בלבד, והם מתייחסים, כמובן, גם לנשים.",
            },
          ],
          point2: [
            {
              heading: "2. הרשמה",
              para1:
                'אם הכניסה ו/או השימוש באתר ו/או קבלת השירותים המוצעים על ידי האתר כרוך ברישום, תתבקש למסור פרטים מזהים, כגון שם, כתובת דוא"ל, טלפון ו/או פרטים מזהים נוספים, כדי לאפשר לחברה ליצור עימך קשר.',
              para2:
                "אין החברה אחראית בשום מקרה לכל נזק ו/או אובדן שיגרם כתוצאה ממסירת פרטים שאינם נכונים ו/או מלאים ו/או פרטים של צד שלישי כלשהו שימסרו באופן בלתי מורשה.",
            },
          ],
          point3: [
            {
              heading: "3. תשלום",
              para1:
                "השימוש בכל או בחלק מהשירותים אותם מציע האתר עשוי להיות כרוך בתשלום לחברה ו/או לגורמים אחרים הפועלים בשיתוף פעולה עם החברה.",
              para2:
                "שירותי החברה הכרוכים בתשלום מפורטים באתר. למען הסר ספק, החברה שומרת לעצמה את הזכות לעדכן מעת לעת את עלות השירותים הניתנים כמפורט באתר ו/או את מבנה העלות כאמור, על פי שיקול דעתה הבלעדי, ללא מתן הודעה מוקדמת למשתמש ו/או הסכמתו. עם זאת, ומבלי לגרוע מהאמור לעיל, הודעה על עדכון תשלומים כאמור לעיל ומועד כניסת העדכון לתוקף תפורסם באתר החברה ו/או במסגרת עדכון תנאים אלו.",
              para2:
                "החברה שומרת לעצמה את הזכות להפסיק, לשנות או להטיל עמלות חדשות או נוספות עבור השירותים הניתנים באמצעות האתר, לפי שיקול דעתה של החברה וללא צורך בהודעה מוקדמת או בהסכמת המשתמש או כל צד שלישי, למעט פרסום כאמור. שינויים באתר החברה.",
            },
          ],
          point4: [
            {
              heading: "4. אחריות",
              para1:
                'השירותים המוצעים באתר עשויים להשתנות מעת לעת וניתנים "כמו שהם" ("AS IS"), למעןנוחות המשתמש ולשימושו האישי בלבד.',
            },
          ],
          point5: [
            {
              heading: "5. דיוור ישיר אלקטרוני/מסרון (SMS)",
              para1:
                "5.1: מידע פרסומי ו/או שיווקי ו/או מידע בקשר עם מוצרים ושירותים של החברה ישוגר אל המשתמש בהתאם להסכמה מפורשת שנתן המשתמש לכך במהלך ההרשמה לאתר או בכל דרך אחרת.",
              para2:
                '5.2: מובהר כי הסכמת המשתמש לקבלת הודעות וחומר שיווקי כאמור מהווה הסכמה בהתאם להוראות סעיף 30א לחוק התקשורת (בזק ושירותים), התשמ"1982".',
              para3:
                '5.3: מילוי פרטי דואר אלקטרוני ו/או טלפון סלולארי ואישור קבלת דיוור על ידי הלקוח במקום הייעודי לכך, מהווה הסכמה של המשתמש לקבלת דיוור, הודעות וחומר שיווקי של מידע פרסומי, מבצעים, הנחות, עדכונים והטבות בלעדיות בקשר עם כלל המוצרים ושירותי החברה, באמצעות אמצעי המדיה השונים לרבות הודעות SMS ודוא"ל שיישלחו ישירות למכשירו הסלולארי או לתיבת הדואר האלקטרוני של המשתמש, ולהיכלל לשם כך ברשימת התפוצה של החברה.',
              para4:
                "5.4: בכל שלב משתמש יכול לבקש הסרתו מרשימת התפוצה בהתאם למנגנון ההסרה שיימצא בכל דיוור.",
            },
          ],
          point6: [
            {
              heading: "6. שימושים אסורים",
              description:
                "אינך רשאי (ואינך רשאי להתיר לכל צד שלישי), אלא אם הדבר הותר במפורש על פי תנאי שימוש אלה:",
              para1:
                " (א) להשתמש באתר ו/או בשירותים לכל מטרה בלתי חוקית, בלתי מוסרית, פוגענית ו/או מזיקה, בלתי-מורשית ו/או אסורה;",
              para2:
                "(ב) להשתמש באתר ו/או בשירותים למטרות מסחריות או שאינן פרטיות, ללא הסכמה מפורשת של החברה ו/או נציגיה המורשים בכתב ומראש;",
              para3:
                "(ג) להסיר או להפריד מהאתר כל הגבלות וסימנים המציינים זכויות קנייניות של החברה או נותני הרישיון שלה, לרבות כל ההודעות הקנייניות המופיעות בהם (כגון ©, TM או ®), והנך מצהיר ומתחייב בזאת כי תציית לכל החוקים החלים בעניין זה;",
              para4:
                "(ד) להפר ו/או לפגוע בזכויות המשתמשים לפרטיות וזכויות אחרות (כולל בין היתר, זכויות קניין רוחני), או לאסוף מידע אישי מזהה אודות משתמשים ללא הסכמתם המפורשת, בין אם באופן ידני או באמצעות שימוש בכל רובוט, עכביש, כל יישום חיפוש או אחזור, או שימוש באמצעי, בתהליך או בשיטה ידניים או אוטומטיים אחרים על מנת להיכנס לאתר ולאחזר, לאסוף ו/או לשאוב מידע;",
              para5:
                "(ה) לפגוע, להכביד או לשבש בפעולת האתר ו/או השירותים, או להפר כל חוק, תקנה, דרישה, נוהל או מדיניות של שרתים או רשתות כאמור;",
              para6:
                "(ו) להצהיר הצהרות שקריות או כוזבות, או להציג מצג שווא בנוגע לקשר שלך עם כל אדם או גוף, או לציין במפורש או במרומז כי החברה משויכת אליך בכל דרך שהיא, מעניקה חסות, תומכת בך , בעסקך או בהצהרותיך, או להציג מידע שקרי או לא מדויק אודות האתר, השירותים ו/או החברה;",
              para7:
                "(ז) לבצע כל פעולה היוצרת או העלולה ליצור עומס גדול ובלתי סביר על תשתית האתר;",
              para8:
                "(ח) לעקוף את כל האמצעים בהם החברה משתמשת על מנת למנוע או להגביל את הגישה לאתר;",
              para9:
                "(ט) להעתיק, לתקן, לשנות, להתאים, למסור, להנגיש, לתרגם, להפנות, לבצע הנדסה חוזרת (אלא אם הדין החל אוסר באופן מפורש הצבת הגבלה כאמור), לעשות דה-קומפילציה, ליצור יצירות נגזרות, לבצע, להפיץ, לתת רישיון משנה, לעשות כל שימוש מסחרי, למכור, להשכיר, להעביר, להלוות, לעבד, לאסוף, לשלב עם תוכנה אחרת - של כל חומר הכפוף לזכויות קנייניות של החברה, לרבות קניין רוחני של החברה (כהגדרתו של מונח זה להלן), ולרבות כל סוגי מידע שנצברו במאגרי הנתונים של החברה, בכל אופן או בכל אמצעי, אלא אם הדבר הותר במפורש בתנאים ו/או על פי כל דין החל, המתיר פעולות אלו במפורש;",
              para10:
                "(י) למכור, לתת רישיון, או לנצל למטרה מסחרית כלשהי כל שימוש או גישה לאתר; ",
              para11:
                '(יא) להעביר או להנגיש בכל דרך אחרת, בקשר לאתר ו/או לשירותים, כל וירוס, "תולעת", סוס טרויאני, באג, רוגלה, נוזקה, או כל קוד מחשב, קובץ או תוכנה אחרים אשר עשויים להזיק, או נועדו להזיק לפעילות של כל חומרה, תוכנה, ציוד תקשורת, קוד או רכיב; ו/או',
              para12:
                "(יב) להפר אי אלו מהתנאים. כמו כן, חל איסור מוחלט על יצירת קישוריות (לינקים) לאתר, אלא אם נתקבלה הסכמה מפורשת של החברה מראש ובכתב.",
            },
          ],
          point7: [
            {
              heading: "7. זכויות קניין רוחני",
              para1:
                'האתר והשירותים המוצעים בו, וכל זכויות קניין רוחני הנוגעות בהם, לרבות אך לא רק, פטנטים ובקשות לפטנטים, סימני מסחר ובקשות לסימני מסחר, שמות מסחר, מוניטין, זכויות יוצרים, סודות מסחר, שמות מתחם, בין אם רשומים או ניתנים לרישום ובין אם לאו (להלן, ביחד: "הקניין הרוחני") הם בבעלות החברה ו/או נמסרו לה ברישיון ומוגנים על ידי חוקי זכויות יוצרים וחוקי קניין רוחני אחרים ועל ידי אמנות והסכמים בינלאומיים. כל זכות שלא הוקנתה למשתמש במפורש על פי הסכם זה תישמר בידי החברה ונותני הרישיון שלה.',
              para2:
                "בכפוף לתנאים, החברה מעניקה למשתמש, והמשתמש מקבל בזאת, רישיון מוגבל, אישי, בלתי-ייחודי, ואשר ניתן לביטול באופן מלא, בלתי-עביר ושאינו ניתן להמחאה ואשר לא ניתן להעניק בו רישיונות-משנה להשתמש באתר ובשירותים המוצעים באתר באופן פרטי ואינו מסחרי, כל זאת בהתאם לתנאים. למען הסר ספק, התנאים אינם מקנים למשתמש זכות בקניין הרוחני של החברה, אלא אך ורק זכות שימוש מוגבלת בשירותים המוצעים באתר וזו ניתנת לביטול כאמור בתנאים. אף הוראה בתנאים לא מהווה ויתור על קניינה הרוחני של החברה על פי כל דין.",
              para3:
                "המשתמש מסכים בזאת כי יתכן שהחברה תשמור עותקים של מידע מסוים הנמסר על ידי המשתמש לצרכי גיבוי או לצורך אכיפת התנאים, לרבות ביצוע בדיקות של הפרת התנאים לפי שיקול דעתה של החברה, והכל כפוף לתנאים ולהוראות כל דין.",
            },
          ],
          point8: [
            {
              heading: "8. סימני מסחר ושמות מסחריים",
              para1:
                'הסימנים, הלוגואים של החברה ושאר המזהים הקניינים המשמשים את החברה בקשר עם האתר ו/או השירותים המוצעים באתר (להלן: "סימני המסחר של החברה") הם כולם סימני מסחר ו/או שמות מסחר של החברה, בין אם רשומים ובין אם לאו, ובין אם ניתנים לרישום ובין אם לאו. כל שאר סימני המסחר, שמות המסחר, סימנים מזהים אחרים וסמלים מסחריים אחרים (לרבות לוגו כזה או אחר) העשויים להופיע באתר שייכים לבעליהם (להלן: "סימני מסחר של צדדים שלישיים"). סימני מסחר של צדדים שלישיים מובאים באתר (אם בכלל) למטרות הצגה, תיאור וזיהוי בלבד. לא ניתנת בזאת כל זכות, רישיון או קניין בסימני המסחר של החברה או בסימני המסחר של צדדים שלישיים ולכן על המשתמש להימנע משימוש כלשהו בסימנים אלו, אלא אם כן הותר אחרת בתנאי שימוש אלה.',
            },
          ],
          point9: [
            {
              heading: "9. שינויים באתר",
              para1:
                "החברה שומרת לעצמה את הזכות לבצע באתר תיקונים, הרחבות, שיפורים, התאמות וכל שינוי אחר לרבות הפסקת פעילות האתר או כל חלק ממנו, ללא הודעה מוקדמת ובכל עת. המשתמש מסכים כי החברה ו/או נציגי החברה המורשים לא יהיו אחראיים כלפיו או כלפי כל צד שלישי בגין כל שינוי, השעיה או הפסקת פעולת האתר ו/או השירותים.",
              para2:
                'לחברה אין חובה לספק עדכונים או שדרוגים של האתר תחת תנאים אלו. ככל שרלוונטי, החברה תספק עדכונים ותמיכה ישירות למשתמש, לפי שיקול דעתה של החברה. אם הינך נדרש לתמיכה כלשהי בקשר לשימוש באתר ו/או בשירותים, אנא צור עמנו קשר באמצעות האתר או בכתובת דוא"ל: service.justagame@gmail.com',
            },
          ],
          point10: [
            {
              heading: "10. מדיניות פרטיות",
              para1:
                "אם בכוונתך להיכנס ו/או להתחבר ו/או להשתמש באתר ובשירותים, עליך לקרוא תחילה ולהסכים למדיניות הפרטיות. הואיל ומדיניות הפרטיות יכולה להשתנות מדי פעם, מומלץ שתחזור ותתעדכן בה מעת לעת.",
              para2:
                "החברה מכבדת את הפרטיות שלך ומחויבת להגן על המידע האישי שאתה משתף עם החברה. אנחנו מאמינים כי למשתמשים שלנו יש את הזכות המלאה להכיר את המדיניות ואת הנהלים שלנו בנוגע לאיסוף ושימוש במידע המתקבל על ידינו בשעה שהמשתמשים שלנו משתמשים באתר ובשירותים. מדיניות הפרטיות של החברה, הנהלים וסוגי המידע אשר נאספים על-ידי החברה ואופן השימוש בו מתוארים במדיניות הפרטיות של האתר המופיעה בלינק הבא: https://justagame.tech/privacy-policy ",
              para3:
                "הנך מסכים ומאשר לחברה לעשות שימוש במידע אישי אשר העברת ו/או הנגשת לחברה בהתאם למדיניות הפרטיות של החברה.",
            },
          ],
          point11: [
            {
              heading: "11. זמינות האתר והשירותים",
              para1:
                "זמינות ופונקציונאליות האתר תלויה בגורמים רבים. אנו נעשה מאמצים סבירים על מנת להבטיח שהאתר והשירותים יהיו זמינים באופן רציף. יחד עם זאת, החברה לא תהיה אחראית, ואיננה מבטיחה או מתחייבת כי האתר והשירותים יפעלו ו/או יהיו זמינים בכל עת ללא הפרעות או תקלות, וכי יהיו ללא פגם. הנך מסכים בזאת כי החברה לא תהיה אחראית לאי היכולת של האתר ו/או השירותים לפעול או להיות נגישים, מכל סיבה שהיא; לרבות הפסקות בפעילות האינטרנט או רשתות, הפסקות בפעילות החומרה או התכנה בשל בעיות טכניות או אחרות שאינן בשליטת החברה (למשל, סיכול, כוח עליון, רשלנות של צדדים שלישיים וכד'). היה ותידרש תחזוקה לאתר באופן אשר ישפיע על זמינותו, עשויה החברה (אך לא חייבת) ליידע את המשתמשים על כך מבעוד מועד.",
              para2:
                "יחד עם זאת ידוע למשתמש כי זמינות קורס לאחר רכישה הינו תקופת זמן של 3 חודשים ממועד הקניה. במידה והמשתמש הינו מנוי במערכת הזמינות של כל קורס תיהיה לכל תקופת זמן המנוי.",
            },
          ],
          point12: [
            {
              heading: "12. הגבלת אחריות",
              para1:
                "במידה המקסימאלית האפשרית על פי דין, החברה, לרבות נציגי החברה, לא יהיו אחראים לכל נזקים שייגרמו למשתמשים או לצד ג', מכל סוג שהוא, לרבות, נזקים ישירים, עקיפים, מיוחדים, עונשיים, אגביים או תוצאתיים (לרבות, מבלי לגרוע מכלליות האמור, נזק למוניטין, לרווחים, למידע, או לעסקים ונזק בגין עגמת נפש), על פי כל עילה משפטית (לרבות אך לא רק, חוזית, נזיקית, אחריות קפידה או אחרת) הנובעים מתנאי שימוש אלה, מהאתר, לרבות משימוש בשירותים, או מאי-יכולת להשתמש באתר ו/או בשירותים, מהתקשרויות של המשתמשים עם ספקים או צדדים שלישיים אחרים הנובעות מהשימוש באתר, או מכל מעשה או מחדל של החברה ו/או נציגי החברה, המבוסס על הפרת המצגים או ההתחייבויות של החברה ו/או של נציגי החברה, הנובעים או הקשורים בתנאים; והכל בין אם נודע לחברה על האפשרות שנזק כאמור עלול להיגרם ובין אם לאו. מבלי לגרוע מכלליות האמור לעיל, ובמידה המקסימאלית האפשרית על פי דין, החבות המצטברת של החברה ו/או נציגי החברה עבור כל הנזקים הנובעים מתנאי שימוש אלה או בנוגע לשימושו של המשתמש באתר ו/או בשירותים, תוגבל לסכום אותו שילמת (ככל שרלוונטי) לחברה בשנה בה אירע האירוע המקים למשתמש טענה כלפי החברה, או לחלופין סכום של מאה (100) שקלים חדשים, לפי הגבוה מביניהם.",
              para2:
                "היה וסמכויות שיפוט מסוימות אינן מאפשרות החרגות או הגבלות כאמור לעיל, ההחרגות וההגבלות הנזכרות לעיל לא תחולנה במלואן, אלא רק במידה המקסימאלית המותרת על פי הדין החל.",
            },
          ],
          point13: [
            {
              heading: "13. שיפוי",
              para1:
                "המשתמש מסכים להגן ולשפות את החברה ואת נציגי החברה מפני ונגד כל תביעה, נזק, הפסד, התחייבות, הוצאה וחוב (לרבות שכר טרחת עורך דין) אשר נובעים מהשימוש באתר ו/או בשירותים שלא בהתאם לתנאים.",
            },
          ],
          point14: [
            {
              heading: "14. שינויים בתנאי השימוש",
              para1:
                'החברה רשאית, על פי שיקול דעתה הבלעדי, לשנות את התנאים מעת לעת ומבקשת מכלל המשתמשים לשוב ולבקר בדף זה לעיתים קרובות ככל האפשר. נודיע לך על כל שינוי מהותי בתנאי השימוש, על-ידי החלפת הקישור ל"תנאי השימוש" בעמוד הבית של האתר בקישור ששמו "תנאי שימוש" ו/או על-ידי משלוח דואר אלקטרוני לכתובת הדואר האלקטרוני אותה יתכן והעברת לחברה במסגרת השימוש באתר. שינויים מהותיים יכנסו לתוקף תוך שבעה (7) ימים ממועד ההודעה כאמור. כל שאר השינויים בתנאי השימוש ייכנסו לתוקף בתאריך העדכון האחרון, והמשך השימוש שלך באתר לאחר תאריך העדכון האחרון הנקוב יהווה הסכמה שלך לכך שהשינויים יחייבו אותך. במידה ונצטרך לשנות את התנאים על מנת לעמוד בדרישות הדין, שינויים אלה יכנסו לתוקף באופן מידי או כנדרש על פי דין, וזאת ללא מתן הודעה מוקדמת.',
            },
          ],
          point15: [
            {
              heading: "15. הפסקת פעילות האתר ו/או סגירת חשבון",
              para1:
                "תנאים אלה יעמדו בתוקפם עד לסיומם כמפורט בתנאים אלה. הפרת התנאים על ידך עלולה להביא לביטול רישיונך להשתמש באתר וכן לסגירת חשבונך באתר.",
              para2:
                "אם אינך מסכים לתנאים, כפי שיתוקנו מעת לעת, או אינך מרוצה מהאתר ו/או מהשירותים, הנך רשאי לסיים את התנאים הללו בכל עת על ידי הפסקת השימוש באתר לצמיתות ו/או סגירת חשבונך ו/או משלוח הודעת סיום ל-service.justagame@gmail.com, וזה יהיה הסעד היחיד שיעמוד לרשותך. עם סיום ההתקשרות, מכל סיבה שהיא: (i) הרישיונות וכל הזכויות האחרות שהוקנו לך לעיל יסתיימו באופן אוטומטי, (ii) תחויב להפסיק לאלתר כל שימוש באתר ו/או בשירותים, וכן (iii) חשבונך יימחק ו/או הגישה אליו תוגבל. מחיקת החשבון עלולה לגרום למחיקת נתונים ומידע, והחברה לא תישא בכל אחריות לנתונים ומידע שנמחקו כאמור.",
              para3:
                "החברה רשאית, בכל עת, לחסום ו/או להגביל באופן קבוע את גישת המשתמש לאתר ו/או לחשבונו ו/או לשירותים המוצעים באתר על פי שיקול דעתה הבלעדי, לרבות, אל לא רק, כאשר החברה חוששת להפרת התנאים ו/או כל דין על ידי המשתמש ו/או צד שלישי כלשהו, בנוסף לכל סעד אחר העשוי לעמוד לרשות החברה על פי כל דין.",
              para4:
                "בנוסף, החברה רשאית בכל עת, על פי שיקול דעתה הבלעדי, להפסיק את פעילות האתר, באופן זמני או לצמיתות, מבלי לתת כל הודעה מוקדמת. המשתמש מסכים ומאשר כי החברה לא תהיה אחראית לאובדן מידע ו/או נזקים כלשהם הנובעים או הקשורים בהחלטתה להפסיק או להשהות את פעילות האתר.",
              para5:
                'הוראות תנאי שימוש אלה, אשר על פי טבען שורדות את סיום ההתקשרות בכדי לקיים את מטרות התנאים יישארו בתוקף. מבלי לגרוע מכלליות האמור לעיל, הסעיפים בדבר קניין רוחני, הסרת אחריות, הגבלת אחריות, שיפוי וסעיף "כללי" ימשיכו לחול אף לאחר סיום ההתקשרות.',
            },
          ],
          point16: [
            {
              heading: "16. קורס דיגיטלי",
              para1:
                "רכישת קורס דיגיטלי מהאתר מותנית בהרשמה מראש, הכוללת הזנת פרטים אישיים ויצירת שם משתמש וסיסמה ייחודיים.",
              para2:
                'יש לשמור את שם המשתמש והסיסמה בסודיות ולהימנע מהעברתם לצד שלישי כלשהו. במידה והמשתמש חושד כי חשבונו נפרץ, עליו להודיע על כך מיידית באמצעות דוא"ל לכתובת [הזן כתובת אימייל].',
              para3:
                "המשתמש אחראי לוודא כי יש לו חיבור אינטרנט יציב ונאות לצורך צפייה שוטפת בתכני הקורס, המשודרים דרך רשת האינטרנט.",
              para4:
                "כל תכני הקורסים המוצגים באתר הינם בבעלות בלעדית של החברה, והמשתמש מקבל זכות גישה לצפייה אישית בלבד, ללא זכויות נוספות.",
              para5:
                "ניסיונות גישה לקורס ממכשירים מרובים או מכתובות IP שונות יובילו לחסימת הגישה המיידית לקורס.",
              subHeading: "מדיניות ביטולים והחזרים:",
              subPara1:
                'החזרת מוצרים וביטול עסקאות יתבצעו בהתאם להוראות חוק הגנת הצרכן, התשמ"א-1981, כפי שיתוקן מעת לעת ובהתאם לתקנות שיוצאו מכוחו (להלן: "החוק").',
              subPara2:
                "משתמש שרכש קורס דיגיטלי לא יוכל לבטל את הרכישה אלא לפי הוראות החוק בתוך 14 יום בלבד מיום הרכישה, ובתנאי שהקורס לא נפתח לצפייה כלל (אפילו לא פרק אחד). במקרה של ביטול כאמור, יחולו דמי ביטול בגובה של 10% מהתשלום הכולל או דמי הסליקה, הנמוך מביניהם.",
              subPara3:
                "במידה והמשתמש התחיל לצפות בתכני הקורס, הוא לא יהיה זכאי להחזר כלשהו, גם לא באופן יחסי.",
              subPara4:
                "החברה שומרת לעצמה את הזכות להפסיק את מתן השירותים למשתמש במקרה של אי תשלום או ביטול התשלום עבור הקורס.",
              subPara5:
                'המשתמש מסכים לקבל חשבוניות ודיווחים רלוונטיים דרך הדוא"ל שנמסר בעת ההרשמה, במקום קבלת חשבוניות מודפסות בדואר.',
              subPara6:
                "במקרה של בעיות טכניות או תקלות אחרות הקשורות למכשיר של המשתמש, החברה לא תישא באחריות ולא תבצע החזרים כספיים. על המשתמש לוודא שהמכשיר שלו תואם לצפייה בתכנים, וכי יש לו את כל ההגדרות והעדכונים הנדרשים.",
              subHeading2: "משך זמן הגישה לקורס:",
              subPara7:
                "הגישה לתכני הקורס תהיה זמינה למשך 3 חודשים ממועד ההרשמה, ולאחר מכן תסתיים הגישה באופן אוטומטי.",
            },
          ],
          point17: [
            {
              heading: "17. כללי",
              para1:
                "(א) תנאי שימוש אלה מייצגים את מלוא ההבנות וההסכמות שהושגו בינך לבין החברה בנוגע לנושאים המוזכרים בתנאים אלה, והם גוברים על כל הסכמות או הבנות קודמות, בכתב או בעל פה, בינך לבין החברה; ",
              para2:
                "(ב) כל תביעה הנוגעת לשימושך באתר ו/או בשירותים תידון בהתאם לדיני מדינת ישראל ותפורש בהתאם להם (ללא תחולת כללי ברירת הדין הבינלאומי), והאמנה בדבר מכר טובין בינלאומי לא תחול;",
              para3:
                "(ג) כל סכסוך שיתעורר או יהיה קשור לשימושך באתר ו/או בשירותים יובא להכרעת בתי המשפט המוסמכים במחוז תל אביב, ישראל, ואתה מסכים בזאת לסמכות השיפוט הבלעדית של בתי משפט אלה. אתה מוותר בזאת על כל טענה בדבר היעדר סמכות שיפוט או פורום לא נאות, ומסכים כי ניתן יהיה להמציא לך כתבי בי-דין בכל דרך המותרת על פי דין או לפי החלטת בית משפט;",
              para4:
                "(ד) תנאי שימוש אלה לא יתפרשו כיצירת יחסי שותפות, מיזם משותף, יחסי עובד-מעביד, יחסי שליחות או יחסי זכיינות בין הצדדים;",
              para5:
                "(ה) שום ויתור על כל הפרה או אי-קיום של תנאים אלה לא ייחשב כוויתור על כל הפרה או אי-קיום אחרים, בין אם הם קודמים ובין אם מאוחרים;",
              para6:
                "(ו) כל כותרת של סעיף או תת-סעיף ניתנת לצורכי נוחות בלבד, ואינה מהווה חלק אינטגרלי מהתנאים או משפיעה על פרשנותם;",
              para7:
                "(ז) הנך מסכים שכל תביעה שתהיה לך בקשר לשירותים או לשימושך באתר תוגבל לשנה אחת (1) מיום היווצרות העילה לתביעה, ולאחר תקופה זו העילה תתיישן; ",
              para8:
                "(ח) אם ייקבע כי סעיף כלשהו בתנאי שימוש אלה אינו חוקי, בטל או בלתי ניתן לאכיפה, אזי הסעיף האמור יוגבל או יופרד במידת הצורך, ולא ישפיע על תוקפן של יתר הוראות התנאים;",
              para9:
                "(ט) אינך רשאי להעביר או להקצות את זכויותיך או התחייבויותיך לפי תנאים אלה ללא אישורנו מראש ובכתב. החברה רשאית להעביר את התחייבויותיה לפי תנאים אלה לכל צד שלישי ללא כל מגבלה; ",
              para10:
                "(י) הנך מסכים כי גרסה מודפסת של תנאים אלה וכל הודעה שניתנה באופן אלקטרוני תהיה קבילה בכל הליך משפטי או מנהלי באותו אופן ובכפוף לאותם תנאים כמו מסמכים ורשומות עסקיים שהופקו ונשמרו בגרסה מודפסת.",
            },
          ],
          point18: [
            {
              heading: "18. שאלות",
              para1:
                "במידה ויש לך שאלות נוספות או הערות בנוגע לתנאים, הינך מוזמן לפנות אלינו באמצעות דואר אלקטרוני בכתובת: service.justagame@gmail.com. אנו נעשה את מירב המאמצים לחזור אליך תוך זמן סביר.",
            },
          ],
          lastUpdate: "תאריך עדכון אחרון 1 ספטמבר 2024",
        },
        // terms of use page end
        // Privacy Policy page start
        privacyPolicy: {
          title: "Privacy Policy",
          para1:
            'מדיניות הפרטיות להלן חלה על השימוש באתר האינטרנט של לביא פיננסים בע"מ (להלן: "החברה") בכתובת: https://justagame.tech (להלן: "האתר") ומהווה חלק בלתי נפרד מתנאי השימוש של האתר הזמינים בלינק https://justagame.tech/terms-conditions . החברה רואה חשיבות רבה בשמירה על פרטיות המשתמשים באתר, ובמסמך זה תמצא את הכללים לפיהם פועלת החברה כדי להגן על פרטיותך. מדיניות הפרטיות קובעת מהם נהלי החברה בנוגע לאיסוף, שימוש וגילוי מידע שמשתמשי האתר מעבירים לחברה באמצעות האתר. אנא קרא/י בעיון את מדיניות הפרטיות המובאת להלן לפני השימוש באתר או מסירת כל מידע באמצעותו. בעצם השימוש באתר ושליחת מידע באמצעותו, הנך מסכים לתנאי מדיניות זו. מדיניות הפרטיות נכתבה בלשון זכר מטעמי נוחות ומתייחסת כמובן גם לנשים. למונחים שאינם מוגדרים במסמך זה תהיה המשמעות המיוחסת להם בתנאי השימוש.',
          heading1: "המידע שאנו אוספים",
          para2: "החברה אוספת מספר סוגי מידע מהמשתמשים באתר:",
          point1:
            '1. מידע שאינו מזהה אישית ("מידע לא אישי"): זהו מידע שאינו מאפשר זיהוי אישי של המשתמש, כמו נתונים טכניים ואנונימיים הנאספים במהלך הגלישה באתר. מידע זה כולל בין היתר את כתובת ה-IP שלך, סוג הדפדפן, זמני גישה, ואילו מכשירים אתה משתמש בהם לגלישה. המידע הזה עוזר לנו לשפר את איכות השירותים ולנתח את השימוש באתר.',
          point2:
            '2. מידע אישי מזהה ("מידע אישי"): זהו מידע פרטי המזהה אותך באופן אישי, כמו שמך, כתובת הדוא"ל שלך, ומספר הטלפון שלך. המידע האישי נאסף בעיקר כאשר אתה משתמש בשירותים שמציע האתר הדורשים הזדהות, כמו פתיחת חשבון וניהולו. אם תבחר שלא למסור פרטים מסוימים, לא תוכל להשתמש בחלק מהשירותים המוצעים באתר.',
          para3:
            "מידע לא אישי אשר משולב עם מידע אישי ייחשב למידע אישי כל עוד הקשר הזה מתקיים.",
          para4:
            "שים לב: אנו לא נאסוף עליך מידע אישי ללא הסכמתך המפורשת, אשר ניתנת, בין היתר, בעת קבלתך את תנאי השימוש ואת מדיניות הפרטיות ובעצם שימושך באתר.",
          heading2: "כיצד אנו משתמשים במידע האישי שאנו אוספים",
          para5:
            "השימוש במידע האישי על ידי החברה ייעשה בהתאם להוראות מדיניות פרטיות זו ולתנאי השימוש, ומטרותיו כוללות:",
          bullet1:
            "מתן השירותים: אנו משתמשים במידע האישי כדי לספק לך את השירותים אותם ביקשת או כדי לשפר את איכות השירותים הקיימים.",
          bullet2:
            "אבטחת האתר: המידע משמש אותנו לצרכי בקרה ואבטחת מידע, כדי לשמור על האתר מפני איומים ואירועים בלתי רצויים.",
          bullet3:
            "קישור עם צדדים שלישיים: במידה ואתה מסכים לכך, אנו עשויים להעביר את המידע שלך לצדדים שלישיים לצורך מתן שירותים נוספים וכל זאת בהתאם לתנאים המפורטים במדיניות זו.",
          heading3: "העברת מידע אישי לצדדים שלישיים",
          para6: "החברה עשויה להעביר מידע אישי לצדדים שלישיים במצבים הבאים:",
          bullet4:
            "שירותים נלווים: אנחנו עשויים להעביר את המידע לצדדים שלישיים המספקים שירותים הקשורים לפעילות החברה,. צדדים שלישיים אלה יפעלו לשמירת פרטיותך בהתאם לחוקי הגנת הפרטיות החלים.",
          bullet5:
            "אכיפת החוק: אם נידרש לכך על ידי חוק או צו שיפוטי, נמסור את המידע האישי שלך לרשויות המתאימות.",
          heading4: "שינוי או מחיקה של מידע אישי",
          para7:
            'בכל עת שתרצה תוכל לפנות לחברה במייל הבא- service.justagame@gmail.com ולבקש להפסיק לקבל הודעות דוא"ל או כל תקשורת אחרת מהחברה ו/או מספקים ו/או מצדדים שלישיים ו/או למחוק את המידע האישי שלך מן הרישומים של החברה. כמו כן, באפשרותך לבקש גישה למידע האישי שהעברת לחברה או לבקש תיקון ו/או עדכון של מידע אישי זה. שים לב: אלא אם תורה לנו אחרת, אנו רשאים להחזיק במידע האישי שלך, כל עוד הדבר נחוץ באופן סביר עבור המטרות שבגינם נאסף המידע האישי, לרבות אך לא רק, על מנת לעמוד בדרישות, החובות או ההתחייבויות',
          heading5: "אבטחה",
          para8:
            "החברה נוקטת אמצעים טכנולוגיים וארגוניים מתקדמים לשמירה על אבטחת המידע האישי שלך, אך חשוב לזכור שאין מערכת אבטחה שהיא חסינה באופן מוחלט מפני פריצות או שימוש בלתי מורשה.",
          heading6: "שירותי צדדים שלישיים",
          para9:
            "האתר עשוי לכלול קישורים או שימוש בשירותים של צדדים שלישיים. החברה אינה אחראית על מדיניות הפרטיות של אותם צדדים שלישיים, ולכן מומלץ לקרוא את תנאי השימוש והפרטיות שלהם.",
          heading7: "טכנולוגיות מעקב (Cookies)",
          para10:
            'במהלך השימוש באתר, אנו או צדדים שלישיים עשויים להשתמש בטכנולוגיות הנפוצות בתעשייה, המכונות "עוגיות" (Cookies), Flash, או טכנולוגיות מעקב אחרות (להלן: "טכנולוגיות מעקב"). טכנולוגיות אלו מאוחסנות על גבי המכשיר שלך ומאפשרות לנו לבצע תהליכים אוטומטיים, כמו התחברות אוטומטית לאתר, ובכך לשפר ולהקל על חוויית השימוש שלך.',
          para11:
            "באפשרותך לנטרל את טכנולוגיות המעקב דרך ההגדרות של דפדפן האינטרנט שלך. רוב הדפדפנים מאפשרים למחוק עוגיות, לחסום אותן או להגדיר התראות לפני שהן נשמרות על המכשיר.",
          para12:
            'עם זאת, יש לזכור שאם תבחר למחוק או לחסום את טכנולוגיות המעקב, או לשנות את ההגדרות של Flash, יתכן שחוויית השימוש שלך באתר תהיה מוגבלת. למידע נוסף על איך לשנות את ההגדרות האלו, אנא עיין במדריכים הקיימים בדפדפן שלך או במסך ה"עזר".',
          heading8: "עדכונים במדיניות הפרטיות",
          para13:
            "החברה עשויה לשנות מעת לעת את מדיניות הפרטיות, ולכן מומלץ לבקר בדף זה באופן תקופתי כדי להתעדכן בשינויים.",
          heading9: "צור קשר",
          para14:
            "אם יש לך שאלות או הערות בנוגע למדיניות הפרטיות, ניתן לפנות אלינו בכתובת:service.justagame@gmail.com . אנו נעשה את מירב המאמצים לחזור אליך בהקדם.",
          lastUpdate: "תאריך עדכון אחרון 1 ספטמבר 2024",
        },
        // Privacy Policy page end
        // Cookie Policy page start
        cookiePolicy: {
          title: "Cookie Policy",
          para1:
            "האתר אינטרנט זה מנוהל על ידי לביא פיננסים, אשר שומרת על הזכות לעדכן מדיניות זו בכל עת על ידי פרסום שינויים בדף זה. מומלץ לבקר בדף זה מעת לעת כדי לסקור את השינויים העדכניים.",
          para2:
            "עוגיות הן קבצי נתונים קטנים המאוחסנים במכשיר שלך במהלך הגלישה באתר. קבצים אלו משמשים לניטור וניתוח הפעילות שלך באתר, ולשיפור חוויית השימוש. למידע נוסף על אופן השימוש בעוגיות ואיך לשלוט בהן, מומלץ לעיין בקובץ העזרה של הדפדפן שלך או לבקר באתר http://www.aboutcookies.org.",
          para3:
            "אנו משתמשים בעוגיות לזיהוי המשתמשים ולמעקב אחר פעילותם באתר. זה מאפשר לנו להבין טוב יותר את הצרכים שלך ולהתאים את התוכן והשירותים בהתאם. כמו כן, עוגיות עשויות לשמש להצגת מודעות ופרסומים מותאמים אישית לתחומי העניין שלך.",
          heading1: "משתמשי צד שלישי",
          para4:
            "אנו משתפים פעולה עם צדדים שלישיים לאיסוף מידע בנוגע לשימוש באתר, לניהול פעולות פרסום ולשיפור חוויית המשתמש. צדדים שלישיים עשויים להשתמש בעוגיות לאיסוף מידע על פעילותך באתר שלנו ובאתרים אחרים.",
          heading2: "ניתוח מידע",
          para5:
            "אנו עושים שימוש בשירותי ניתוח מידע כדי למדוד את השימוש באתר, לזהות בעיות ולבצע שיפורים ושינויים בהתאם למידע שנאסף.",
          heading3: "איך לצפות ולנהל עוגיות",
          para6:
            "אם ברצונך לבדוק אילו עוגיות מאוחסנות בדפדפן שלך או למחוק עוגיות קיימות, תוכל לעשות זאת דרך הגדרות הדפדפן שלך. להלן מדריכים כלליים לניהול עוגיות בדפדפנים נפוצים:",
          bullet1: "Google Chrome:",
          line1:
            'לחץ על "כלים" > "הגדרות" > "מתקדם" > "הגדרות מסוימות של אתרים" > "עוגיות ונתוני אתרים".',
          bullet2: "Mozilla Firefox:",
          line2:
            'לחץ על "כלים" > "אפשרויות" > "פרטיות ואבטחה" > "היסטוריית גלישה" > "הגדרות" > "הצג קבצי עוגיות".',
          bullet3: "Safari:",
          line3: 'לחץ על "העדפות" > "פרטיות" > "ניהול נתוני אתר" > "פרטיות".',
          bullet4: "Internet Explorer:",
          line4:
            'לחץ על "כלים" > "אפשרויות אינטרנט" > "פרטיות" > "מחק עוגיות".',
          heading4: "הצגת מודעה וניתוב לכתובת אחרת",
          para7:
            "בעת ביצוע פעולות באתר, כמו רכישה או הרשמה, תידרש להסכים למדיניות השימוש בעוגיות שלנו. אם לא תסכים, לא תוכל להמשיך בביצוע הפעולה הרלוונטית באתר.",
          heading5: "שינויים במדיניות עוגיות",
          para8:
            "אנו שומרים לעצמנו את הזכות לעדכן את מדיניות העוגיות שלנו לפי הצורך. תאריך העדכון האחרון יוצג במדיניות כדי שתוכל לעקוב אחר השינויים.",
          heading6: "צור קשר",
          para9:
            'אם יש לך שאלות או בקשות בנוגע למדיניות העוגיות שלנו, אנא פנה אלינו באמצעות הדוא"ל: service.justagame@gmail.com.',
          para10: "תאריך עדכון אחרון 1 ספטמבר 2024",
        },
        // Cookie Policy page end
        // Refund Policy page start
        refundPolicy: {
          title: "מדיניות החזרים",
          heading1: "מדיניות החזרים - רכישת קורסים ומנויים",
          para1:
            'המדיניות הבאה מתארת את תנאי ההחזרים עבור רכישת קורסים דיגיטליים או מנויים בפלטפורמה (להלן: "השירותים"). התשלום עבור השירותים מתבצע מראש, לפני מתן גישה לתכנים הדיגיטליים (להלן: "התמורה").',
          heading2: "מדיניות החזרים עבור קורסים דיגיטליים:",
          point1: "1. ביטול רכישה תוך 14 ימים:",
          bullet1:
            'משתמש שרכש קורס דיגיטלי רשאי לבטל את הרכישה תוך 14 ימים מיום הרכישה, בתנאי שלא נפתחה גישה לאף חלק מהקורס. במקרה של ביטול בתוך התקופה הנ"ל, יוחזר למשתמש הסכום ששולם, למעט דמי ביטול בגובה של 10% מהתמורה הכוללת או דמי הסליקה, הנמוך מביניהם.',
          point2: "2. ביטול לאחר תחילת השימוש:",
          bullet2:
            "במידה והמשתמש החל לצפות בתכני הקורס, לא יינתן החזר כלשהו עבור הרכישה, גם לא באופן יחסי.",
          heading3: "מדיניות החזרים עבור מנויים:",
          point3: "1. ביטול מנוי תוך 14 ימים:",
          bullet3:
            'משתמש שרכש מנוי רשאי לבטל את המנוי תוך 14 ימים מיום הרכישה, בתנאי שלא נעשה שימוש בשירותי המנוי או בתכני הקורסים הכלולים בו. במקרה של ביטול בתוך התקופה הנ"ל, יוחזר למשתמש הסכום ששולם, למעט דמי ביטול בגובה של 10% מהתמורה הכוללת או דמי הסליקה, הנמוך מביניהם.',
          point4: "2. ביטול לאחר תחילת השימוש:",
          bullet4:
            "אם נעשה שימוש בתכני המנוי או בשירותים הנלווים אליו, לא יינתן החזר עבור התקופה שהייתה בשימוש, והחזר יחסי יינתן עבור יתרת התקופה הלא מנוצלת בלבד, בכפוף לתנאים נוספים כפי שמוגדרים בשירות.",
          heading4: "תנאים נוספים:",
          bullet5:
            "מניעה טכנית: במקרה של תקלות טכניות שמונעות גישה לתכני הקורס או המנוי, על המשתמש לדווח על כך מיידית. במקרים של תקלות שאינן ניתנות לפתרון על ידי החברה, תישקל האפשרות להחזר, אך החברה אינה מתחייבת על כך.",
          bullet6:
            "שירות לקוחות: בכל שאלה או בקשה בנוגע למדיניות ההחזרים, ניתן לפנות לצוות שירות הלקוחות בכתובת: service.justagame@gmail.com.",
          lastUpdate: "תאריך עדכון אחרון 1 ספטמבר 2024",
        },
        // Refund Policy page end
        // Accessibility Statement page start
        accessibilityStatement: {
          title: "הצהרת נגישות",
          para1:
            "חברת לביא פיננסים בע״מ מחויבת להבטיח כי הפלטפורמה ללמידה שלה (https://justagame.tech ) תהיה נגישה לכלל המשתמשים, כולל אנשים עם מוגבלויות ואנשים מבוגרים. אנו מאמינים כי כל אדם צריך להיות מסוגל לגלוש באתרנו בצורה יעילה ונעימה, כמו כל שאר המשתמשים. מחקר שנערך בשנת 2003 על ידי חברת מיקרוסופט מצא כי כ-20 עד 25 אחוזים מהאוכלוסייה נתקלים בקשיים בשימוש באינטרנט. נתונים אלו מדגישים את החשיבות של אתרי אינטרנט נגישים יותר, המסייעים לאנשים עם לקויות שונות ואנשים הנעזרים בטכנולוגיות מסייעות להשתמש במחשב ולגשת למידע.",
          para2:
            "Just a game, אחראית על הקמת והפעלת אתר : https://justagame.tech. אנו רואים חשיבות רבה במתן שירות שוויוני לכלל האזרחים ובשיפור השירות הניתן לאזרחים עם מוגבלות.",
          para3:
            "אנו משקיעים משאבים רבים בהנגשת האתר והנכסים הדיגיטליים שלנו על מנת להפוך את שירותי החברה לזמינים יותר עבור אנשים עם מוגבלות.",
          para4:
            "במדינת ישראל כ-20 אחוזים מקרב האוכלוסייה הינם אנשים עם מוגבלות הזקוקים לנגישות דיגיטלית, על מנת לצרוך מידע ושירותים כללים.",
          para5:
            "הנגשת האתר של Just a game, נועדה להפוך אותו לזמין, ידידותי ונוח יותר לשימוש עבור אוכלוסיות עם צרכים מיוחדים, הנובעים בין היתר ממוגבלויות מוטוריות שונות, לקויות קוגניטיביות, קוצר רואי, עיוורון או עיוורון צבעים, לקויות שמיעה וכן אוכלוסייה הנמנית על בני הגיל השלישי.",
          para6:
            'הנגשת אתר זה בוצעה על ידי חברת הנגשת האתרים "Vee הנגשת אתרים".',
          heading1: "רמת הנגישות באתר - AA",
          para7:
            'חברת "Vee", התאימה את נגישות האתר לדפדפנים הנפוצים ולשימוש בטלפון הסלולרי ככל הניתן, והשתמשה בבדיקותיה בקוראי מסך מסוג Jaws ו- NVDA.',
          para8:
            'מקפידה על עמידה בדרישות תקנות שוויון זכויות לאנשים עם מוגבלות 5568 התשע"ג 2013 ברמת AA. וכן, מיישמת את המלצות מסמך WCAG2.2 מאת ארגון W3C.',
          bullet1: "בעברית: הנחיות לנגישות תכנים באינטרנט",
          bullet2: "באנגלית:  Web Content Accessibility Guidelines (WCAG) 2.0",
          para9:
            "הנגשת האתר בוצעה בהתאם להנחיות רשות התקשוב להנגשת יישומיםבדפדפני אינטרנט.",
          heading2: "כיצד עוברים למצב נגיש؟",
          para10:
            'באתר מוצב אייקון נגישות (בד"כ בדפנות האתר). לחיצה על האייקון מאפשרת פתיחת של תפריט הנגישות. לאחר בחירת הפונקציה המתאימה בתפריט יש להמתין לטעינת הדף ולשינוי הרצוי בתצוגה (במידת הצורך).',
          para11:
            "במידה ומעוניינים לבטל את הפעולה, יש ללחוץ על הפונקציה בתפריט פעם שניה. בכל מצב, ניתן לאפס הגדרות נגישות.",
          para12:
            "התוכנה פועלת בדפדפנים הפופולריים: Chrome, Firefox, Safari, Operaבכפוף (תנאי יצרן) הגלישה במצב נגישות מומלצת בדפדפן כרום.",
          para13:
            "האתר מספק מבנה סמנטי עבור טכנולוגיות מסייעות ותמיכה בדפוס השימוש המקובל להפעלה עם מקלדת בעזרת מקשי החיצים, Enter ו- Esc ליציאה מתפריטים וחלונות.",
          para14:
            "לצורך קבלת חווית גלישה מיטבית עם תוכנת הקראת מסך, אנו ממליצים לשימוש בתוכנת  NVDA העדכנית ביותר.",
          heading3: "תיקונים והתאמות שבוצעו באתר:",
          bullet3:
            "התאמה לקורא מסך - התאמת האתר עבור טכנולוגיות מסייעות כגון NVDA , JAWS",
          bullet4: "אמצעי הניווט באתר פשוטים וברורים.",
          bullet5: "תכני האתר כתובים באופן ברור, מסודר והיררכי. ",
          bullet6: "האתר מותאם לצפייה בדפדפנים מודרניים.",
          bullet7: "התאמת האתר לתצוגה תואמת מגוון מסכים ורזולוציות.",
          bullet8: "כל הדפים באתר בעלי מבנה קבוע (1H/2H/3H וכו').",
          bullet9: "לכל התמונות באתר יש הסבר טקסטואלי חלופי (alt).",
          heading4: "פונקציונליות תוכנת נגישות:",
          bullet10:
            "התאמה לקורא מסך - התאמת האתר עבור טכנולוגיות מסייעות כגון NVDA , JAWS",
          bullet11: "עצירת הבהובים - עצירת אלמנטים נעים וחסימת אנימציות",
          bullet12: "דילוג ישיר לתוכן - דילוג על התפריט הראשי ישירות אל התוכן.",
          bullet13: "התאמה לניווט מקלדת.",
          bullet14: "הגדלה / הקטנה של טקסט.",
          bullet15: "ריווח בין אותיות / מילים / שורות.",
          bullet16: "ניגודיות וצבע - גבוהה, הפוכה, שחור לבן.",
          bullet17: "גופן קריא.",
          bullet18: "הדגשת קישורים.",
          bullet19: "מדריך קריאה.",
          bullet20: "שינוי אייקון סמן עכבר.",
          bullet21: "תיאור לתמונות.",
          heading5: "החרגות",
          para15:
            "חשוב לציין, כי למרות מאמצינו להנגיש את כלל הדפים והאלמנטים באתר, ייתכן שיתגלו חלקים או יכולות שלא הונגשו כראוי או שטרם הונגשו.",
          para16:
            "אנו פועלים לשפר את נגישות האתר שלנו כל העת, כחלק ממחויבותנו לאפשר לכלל האוכלוסייה להשתמש בו, כולל אנשים עם מוגבלות.",
          heading6: "יצירת קשר בנושא נגישות",
          para17:
            "אם אתה נתקל בבעיות נגישות כלשהן באתר, נשמח לקבל את המשוב והבקשות שלך על ידי יצירת קשר עם רכז הנגישות שלנו. כדי לעזור לנו לטפל בבעיה בצורה יעילה, אנא ספק כמה שיותר פרטים:",
          bullet22: "תיאור הבעיה.",
          bullet23: "מהי הפעולה שניסיתם לבצע.",
          bullet24: "קישור לדף שבו גלשתם.",
          bullet25: "סוג הדפדפן וגרסתו.",
          bullet26: "מערכת הפעלה.",
          bullet27: "סוג הטכנולוגיה המסייעת (במידה והשתמשתם).",
          para18:
            "Just a game תעשה ככל יכולה על מנת להנגיש את האתר בצורה המיטבית ולענות לפניות בצורה המקצועית והמהירה ביותר.",
          heading7: "נגישות במבנים פיזיים:",
          para19:
            "חשוב להגיד כי לביא פיננסים עוסקת במתן שירותים פיננסים בערוצים שונים וכי מותאמת דרך מתן שירות לכל סוגי הלקוחות. תחת השירות של פלטפורמה ללמידה מקוונת אין קבלת קהל, אנו זמינים בערוצים הדיגיטליים.",
          heading8: "שירות לקוחות נגיש:",
          para20:
            "אנו מחויבים להעניק שירות נגיש ומותאם לכל לקוחותינו, תוך דגש על יצירת חווית שירות שמכבדת את הצרכים הייחודיים של אנשים עם מוגבלות.",
          bullet28:
            "הדרכות עובדים לשירות נגיש: צוות העובדים עובר הדרכות מתמשכות בנושא הנגישות. ההדרכות מתמקדות בהבנה מעמיקה של תחום הנגישות, יצירת מודעות גבוהה יותר בקרב העובדים והקניית כלים מעשיים לשירות נגיש ואיכותי.",
          bullet29:
            "מוקד טלפוני נגיש: המענה הטלפוני שלנו הותאם לצרכים של אנשים עם מוגבלות וללא מוסיקת רקע, כדי להבטיח שהמידע יועבר בצורה נגישה ומובנת.",
          bullet30:
            "אמצעים נוספים ליצירת קשר: אנו מציעים מספר דרכים חלופיות ליצירת קשר עם שירות הלקוחות שלנו, כדי להבטיח שכל אחד יוכל ליצור איתנו קשר בצורה הנוחה לו:",
          bullet31: "דואר אלקטרוני: service.justagame@gmail.com",
          bullet32: "וואטסאפ: 052-6313988",
          line1: "רכז נגישות:",
          line2: "שחר שושן",
          line3: "0526313988",
          line4: "Service.justagame@gmail.com",
          lastUpdate: "תאריך עדכון הצהרת נגישות 18-11-2024",
        },
        // Accessibility Statement page end

        // Frequently Asked Question page start
        faqSection: {
          title: "שאלות נפוצות",
          question1: "מהי המערכת ולמי היא מיועדת?",
          answer1:
            "המערכת שלנו היא פלטפורמת למידה מקוונת, המיועדת לסטודנטים ומורים שמעוניינים ללמוד או ללמד קורסים מקצועיים בצורה פשוטה ונוחה.",
          question2: "כיצד ניתן להירשם למערכת?",
          answer2:
            "ניתן להירשם באמצעות לחיצה על כפתור ההרשמה במסך הבית, לבחור אם אתם סטודנטים או מורים, ולמלא את הפרטים הנדרשים.",
          question3: "מהם סוגי הקורסים הזמינים במערכת?",
          answer3:
            "המערכת מציעה מגוון רחב של קורסים מקצועיים בתחומים שונים, כולל טכנולוגיה, עסקים, ניהול, שיווק, תיווך ועוד.",
          question4: "האם אני יכול להוריד את חומרי הלימוד מהקורס?",
          answer4:
            "כן, במרבית הקורסים ניתן להוריד חומרי לימוד ותמיכה מתוך המערכת לעיון נוסף מחוץ למערכת.",
          question5: "מה קורה אם שכחתי את הסיסמה שלי?",
          answer5:
            "אם שכחת את הסיסמה, ניתן לשחזר אותה באמצעות לחיצה על כפתור “שחזור סיסמה” בדף ההתחברות ואנו נשלח לך הוראות לאיפוס הסיסמה במייל.",
          question6: "האם יש תמיכה טכנית במערכת?",
          answer6:
            "כמובן, יש לנו תמיכה טכנית זמינה. ניתן להשאיר פניה במסך “צור קשר”, לבחור את סוג הבעיה (תמיכה טכנית, חשבון, בעיית תשלום וכו’) ואנחנו נחזור אליך בהקדם.",
          question7: "כיצד אני יכול לרכוש קורס?",
          answer7:
            "לאחר חיפוש הקורס הרצוי, פשוט לחץ על כפתור הרכישה, בחר באחת משלוש שיטות התשלום הזמינות, ואשר את הרכישה.",
          question8: "האם הקורסים מוגבלים בזמן?",
          answer8:
            "כל קורס שרכשת יהיה זמין לצפייה לתקופה של 3 חודשים מיום הרכישה, כך שתוכל ללמוד בקצב שלך.",
          question9: "האם ניתן לקבל הנחה על קורסים?",
          answer9:
            "כן, ניתן להשתמש בקודי הנחה במידה וקיבלתם אחד כזה😉 יש להזין את הקוד בעת הרכישה ולוודא שהוא פעיל.",
          question10: "כיצד המורים יכולים ליצור קורס חדש במערכת?",
          answer10:
            "מורים רשאים ליצור קורסים חדשים על ידי גישה לאזור המורים במערכת, שם ניתן להעלות חומרי לימוד, להוסיף מבחנים ולנהל את תוכן הקורס בצורה פשוטה ואינטואיטיבית.",
        },
        // Frequently Asked Question page end

        // student faq start
        studentFaq: {
          question1: "איך אני מתחיל ללמוד קורס שנרשמתי אליו?",
          answer1:
            "עבור לאזור האישי, לחץ על “הקורסים שלי,” ובחר בקורס שברצונך להתחיל. בתוך עמוד הקורס תוכל לגשת למבחנים, סיכומים, וחומרים תיאורטיים.",
          question2: "איך אני יכול לראות את ההתקדמות שלי בקורס?",
          answer2:
            "בעמוד הקורס יש דשבורד סיכום קורס שם תוכל לראות את כל הנתונים שלך לגבי הקורס.",
          question3: "איך אני מגיש בקשה לתמיכה טכנית?",
          answer3:
            "בתפריט העליון, לחץ על “תמיכה טכנית.” תגיע לעמוד הזה ואם לא מצאת תשובה, תוכל גם לפתוח צ’אט עם נציג.",
          question4: "האם אפשר להוריד את הסיכומים למחשב שלי?",
          answer4:
            "לא, אין להוריד או לצלם מסך לסיכומים, זה נוגד את זכויות היוצרים.",
          question5: "האם אני יכול לסמן סיכום שאני יודע?",
          answer5:
            "בעמוד סיכומים יש כפתור “לייק,” תוכל ללחוץ עליו ולסמן שהוא נקרא ומובן.",
          question6: "אני לא מצליח להוסיף קוד קופון, מה לעשות?",
          answer6:
            "ודא שהקופון תקף ושלא פג תוקפו. אם הבעיה נמשכת, פנה לתמיכה הטכנית בצ’אט.",
          question7: "איך מחושבת ההתקדמות שלי בקורס?",
          answer7:
            "המערכת מחשבת את ההתקדמות בקורס בצורה הבאה: 	•	חצי מהציון מבוסס על כמות הסיכומים שסיימת מתוך כל הסיכומים. 	•	חצי נוסף מבוסס על כמות המבחנים שהשלמת מתוך כלל המבחנים.",
          question8: "איך אני רואה את ההתקדמות שלי בקורס?",
          answer8:
            "בעמוד “הקורסים שלי” על גבי הקורס מופיע אחוז ההתקדמות בקורס.",
          question9: "אני לא מצליח להעלות תמונה לפרופיל שלי, מה לעשות?",
          answer9:
            "ודא שהתמונה בפורמט JPEG או PNG ושגודלה קטן מ-2MB. אם הבעיה נמשכת, נסה מדפדפן אחר.",
          question10: "יש לי שאלה למרצה הקורס, איך אני פונה למרצה?",
          answer10: "בעמוד הקורס מופיע מרצה הקורס וכפתור ליצירת קשר עם המרצה.",
        },
        // student faq end

        // teacher faq start
        teacherFaq: {
          question1: "איך אני יוצר קורס חדש?",
          answer1:
            "בתפריט הראשי, לחץ על “צור קורס,” והעלה חומרים, סיכומים ומבחנים בעמודים המתאימים.",
          question2: "למה אני לא יכול לערוך מבחן שיצרתי?",
          answer2:
            "לאחר יצירת מבחן, אין אפשרות לערוך אותו בעמוד העריכה, אלא רק אם נכנס למבחן עצמו. שם ניתן לערוך את התשובות המוצעות והשאלה, אך לא ניתן להוסיף או להוריד שאלות וגם לא את סדר התשובות הנכונות.",
          question3: "איך אני משתף את הקורס שלי עם תלמידים?",
          answer3: "לאחר פרסום הקורס, תוכל לשתף את הלינק של הקורס.",
          question4: "איך ניתן לערוך סיכום לאחר שיצרתי קורס?",
          answer4:
            "עבור לעמוד עריכת קורס, הכנס לסיכומים, בחר את הסיכום הרצוי ומשם ניתן לערוך אותו.",
          question5: "איך אני מוסיף סיכום לקורס?",
          answer5:
            "בעמוד עריכת הקורס, עבור לתפריט “סיכומים,” לחץ על “הוסף סיכום,” והעלה את הקובץ או הוסף טקסט.",
          question6: "איך אני יודע כמה תלמידים רשומים לקורס שלי?",
          answer6:
            "בלוח הבקרה של המורה תוכל לראות את מספר התלמידים הרשומים לכל קורס בנפרד.",
          question7: "למה אני לא מצליח להוסיף תמונה לעמוד הקורס?",
          answer7:
            "ודא שהתמונה בפורמט נכון (JPEG או PNG) ושגודלה קטן מ-5MB. אם הבעיה נמשכת, נסה להעלות תמונה אחרת.",
          question8: "איך אני משנה את תאריך הסיום של קורס?",
          answer8:
            "לא ניתן לשנות את תאריך סיום הקורס. כל קורס מוגדר ל-3 חודשים כברירת מחדל.",
          question9: "איך אני מקבל משוב מתלמידים?",
          answer9:
            "בעמוד הקורס, ישנה אפשרות לביקורות תלמידים, שיופיעו גם בעמוד הראשי.",
          question10: "כמה קורסים אני יכול לפתוח?",
          answer10: "אין הגבלה על מספר הקורסים שאתה יכול לפתוח.",
        },
        // teacher faq end

        // Login form start
        loginForm: {
          welcome: "ברוך שובך!",
          prompt: "הזן את שם המשתמש והסיסמה שלך כדי להתחבר",
          emailLabel: 'כתובת דוא"ל',
          emailPlaceholder: "name@mail.com",
          passwordLabel: "סיסמה",
          passwordPlaceholder: "*********",
          rememberMe: "זכור אותי",
          forgotPassword: "שכחת סיסמה?",
          loginButton: "התחבר",
          registerPrompt: "כבר יש לך חשבון? התחבר",
          registerLink: "הרשמה",
        },
        // Login form end
        // Registration form start

        countries: {
          US: "ארצות הברית (+1)",
          PK: "פקיסטן (+92)",
          IN: "הודו (+91)",
          IL: "ישראל (+972)",
          UK: "הממלכה המאוחדת (+44)",
          AU: "אוסטרליה (+61)",
          JP: "יפן (+81)",
        },

        registrationLogin: {
          registerTitle: "הירשם",
          loginPrompt: "כבר יש לך חשבון؟",
          loginButton: "התחבר",
          student: "אני סטודנט",
          teacher: "אני המורה",
          firstNameLabel: "שם פרטי",
          firstNamePlaceholder: "אריק",
          lastNameLabel: "שם משפחה",
          lastNamePlaceholder: "אינשטיין",
          usernameLabel: "שם משתמש",
          usernamePlaceholder: "ArikTheGenius",
          emailLabel: 'כתובת דוא"ל',
          emailPlaceholder: "example@mail.com",
          passwordLabel: "סיסמה",
          passwordPlaceholder: "******",
          countryLabel: "קידומת במדינה",
          phoneNumberLabel: "מספר טלפון",
          phoneNumberPlaceholder: "052-110-1998",
          termsParaOne: "אני מסכים ל",
          termsParaTwo: "תנאי השירות ",
          termsParaThree: "ומאשר קבלת עלונים ודואל שיווקי מ-Just A Game.",
          registerButton: "הירשם",
          signInWithGoogleButton: "התחבר עם Google",
        },
        // Registration form end
        // forgot password start
        forgotPassword: {
          title: "שכחת סיסמא",
          prompt: 'הזן את הדוא"ל הרשום שלך כדי לאפס את הסיסמה',
          emailLabel: "אימייל",
          emailPlaceholder: "name@mail.com",
          continueButton: "המשך",
        },
        // fordot password end
        // verified otp form start
        otpVerification: {
          title: "אימות OTP",
          description: 'שלחנו OTP לדוא"ל שלך, אנא אמת זאת',
          continueButton: "המשך",
          otpMessage:
            "אם לא קיבלת אימייל, בבקשה תבדוק את תיבת הספאם, כנראה זה עדיין מגיע לשם🧐",
        },
        // verified otp form end
        // New Password form start
        newPassword: {
          title: "סיסמה חדשה",
          description: "הזן את הסיסמה החדשה שלך כדי לאפס את הסיסמה שלך.",
          newPasswordLabel: "סיסמה חדשה",
          newPasswordPlaceholder: "*********",
          confirmPasswordLabel: "אשר סיסמה",
          confirmPasswordPlaceholder: "*********",
          continueButton: "המשך",
        },
        // New password form end
        // Wait for Approval Section start
        waitForApproval: {
          title: "ממתין לאישור",
          message:
            'תודה על ההרשמה. נסקור את הבקשה שלך ונתקשר אליך תוך 1 יום עסקים. תקבל הודעת דוא"ל ברגע שהבקשה שלך תאושר.',
          logoutButton: "התנתק",
        },
        // Wait for Approval Section end
        // student Sidebar Section start
        studentPersonalArea: {
          title: "אזור אישי",
          myCourses: "הקורסים שלי",
          home: "דף הבית",
          search: "חיפוש",
          support: "תמיכה",
          logout: "התנתק",
        },
        // student Sidebar Section end
        // student profile Section start
        studentprofile: {
          deleteAccount: "מחק חשבון",
          editProfile: "ערוך פרופיל",
          coursesEnrolled: "הקורסים שאני רשום אליהם",
          seeAll: "הצג הכל",
        },
        // student profile Section end
        // student profile Section start
        profile: {
          deleteAccount: "מחק חשבון",
          editProfile: "ערוך פרופיל",
          coursesEnrolled: "הקורסים שאני רשום אליהם",
          seeAll: "הצג הכל",
        },
        // student profile Section end
        // Student Profile Update Section start
        profileUpdate: {
          firstName: "שם פרטי",
          lastName: "שם משפחה",
          username: "שם משתמש",
          email: "אימייל",
          phoneNumber: "מספר טלפון",
          countryCode: 'ארה"ב (+1)',
          updateProfile: "עדכן פרופיל",
          changePassword: "שנה סיסמה",
          oldPassword: "סיסמה ישנה",
          newPassword: "סיסמה חדשה",
          confirmPassword: "אשר סיסמה",
          update: "עדכון",
        },
        // Student Profile Update Section end
        // Student Course Detail Section start
        studentCourseDetail: {
          summaryProgress: "התקדמות סיכום",
          contactTeacher: "צור קשר עם המורה",
          aboutTheCourse: "על הקורס",
          about: "אודות",
          theoreticalMaterial: "חומר תיאורטי",
          summaries: "סיכומים",
          exams: "שאלות",
          resourceFolder: "חומרי עזר",
          courseSummary: "סיכום קורס",
          testAnswered: "מבחנים שנענו במלואם",
          averageGrade: "ציון ממוצע",
          averageTimeToAnswer: "זמן ממוצע לתשובה",
          remainingTime: "זמן שנותר",
          months: "חודשים",
          days: "ימים",
          hours: "שעות",
          minutes: "דקות",
          seconds: "שניות",
          reviewsAboutCourse: "ביקורות על הקורס",
          more: "עוד",
          leaveFeedback: "השאר משוב",
        },
        // Student Course Detail Section end

        // Summaries Section Start
        summaries: "סיכומים",
        // Summaries Section end

        //summaryTitle Section Start
        summaryTitle: "כותרת סיכום",
        //summaryTitle Section end

        // exams Section Start
        exams: "בחינות",
        // exams Section end

        // examName Section Start
        examName: "שם הבחינה",
        // examName Section end

        // answerAndLearn Section Start
        reviewIncorrect: "סקור תשובות שגויות",
        answerAndLearn: "צפייה בשאלות ותשובות",
        search: "לְחַפֵּשׂ",
        // answerAndLearn Section end

        // takeExam Section Start
        takeExam: {
          of: "מתוך",
          title1: "התחלת מבחן, בהצלחה !",
          title: "ביצוע מבחן",
          number: "1 מתוך 20",
          button1: "לִסְגוֹר",
          button2: "הַבָּא",
        },
        // takeExam Section end

        // examMarks Section Start
        examMarks: {
          title: "מזל טוב! סיימת את הבחינה.",
          score: "צִיוּן",
          button1: "הצג שאלות שגויות",
          button2: "חזרה לבחינות",
          button3: "חזרה הביתה",
        },
        // examMarks Section end

        // wrongQuestion Section Start
        wrongQuestion: {
          title: "שאלות שטעיתי בהן",
          button1: "לִסְגוֹר",
          button2: "הַבָּא",
        },
        // wrongQuestion Section end

        // theoreticalMaterial Section Start
        theoreticalMaterial: "חומר תיאורטי",
        // theoreticalMaterial Section end

        // resourceFolder Section Start
        resourceFolder: "חומרי עזר",
        // resourceFolder Section end

        // Teacher sidebar start
        teacherSideBar: {
          home: "בית",
          myCourses: "הקורסים שלי",
          myProfile: "הפרופיל שלי",
          myAccount: "החשבון שלי",
          support: "תמיכה",
          logOut: "התנתק",
        },
        // Teacher sidebar end
        // Teacher Dashboard start
        teacherDashboard: {
          hi: "שלום",
          averageRating: "דירוג ממוצע ופירוט",
          reviews: "ביקורות",
          totalCourses: "סך כל הקורסים",
          totalStudents: "סך כל התלמידים",
          myCourses: "הקורסים שלי",
          seeAll: "הצג הכל",
        },
        // Teacher Dashboard end
        //Teacher my courses start
        teacherMyCourses: {
          myCourses: "קורסים",
          newCourse: "קורס חדש",
        },
        //Teacher my courses end
        // Teacher Course Detail start
        teacherCourseDetail: {
          about: "אודות",
          theoreticalMaterial: "חומר תאורטי",
          summaries: "סיכומים",
          exams: "שאלות",
          resourceFolder: "חומרי עזר",
          aboutTheCourse: "אודות הקורס",
          editCourse: "ערוך קורס",
          active: "פעיל",
          inActive: "לֹא פָּעִיל",
          reviewsAboutCourse: "ביקורות על הקורס",
          more: "יוֹתֵר",
        },
        // Teacher Course Detail end
        // Teacher Create Course start
        teacherCreateCourseStep1: {
          uploadTopicImage: "העלה תמונת נושא",
          noFileChosen: "לא נבחר קובץ",
          tapToChooseImage: "לחץ לבחירת תמונה",
          courseName: "שם הקורס",
          price: "מחיר",
          shortDescription: "תיאור קצר",
          characterCount: "0/400",
          selectTopic: "בחר נושא",
          selectSubtopic: "בחר תת-נושא",
          selectSubSubtopic: "בחר תת-תת-נושא",
          previous: "הקודם",
          next: "הבא",
        },
        teacherCreateCourseStep2: {
          name: "שֵׁם",
          link: "לְקַשֵׁר",
          add: "לְהוֹסִיף",
          submit: "לְהַגִישׁ",
          message: "המחיר חייב להיות בין 50 ל-200",
          theoreticalMaterialLink: "קישור לחומר תיאורטי",
          theoreticalMaterialLinkDescription:
            "הזן שם|קישור מופרדים באמצעות פסיקים",
          theoreticalMaterialLinkHint: "הפרד כל זוג שם|קישור באמצעות פסיק.",
          auxiliaryMaterialLink: "קישור לחומר עזר",
          auxiliaryMaterialLinkDescription:
            "הזן שם|קישור מופרדים באמצעות פסיקים",
          auxiliaryMaterialLinkHint: "הפרד כל זוג שם|קישור באמצעות פסיק.",
          previous: "הקודם",
          next: "הבא",
        },
        teacherCreateCourseStep3: {
          summaryTitle: "כותרת סיכום",
          summaryContent: "תוכן הסיכום",
          add: "הוסף",
          summaries: "סיכומים",
          previous: "הקודם",
          next: "הבא",
          defineExam: "הגדר את הבחינה",
          noCourse: "עדיין לא נוספו בחינות.",
          create: "לִיצוֹר",
          creating: "יצירה",
          remove: "לְהַסִיר",
        },
        teacherCreateCourseStep4no1: {
          examName: "שם הבחינה",
          add: "הוסף",
          definedExams: "בחינות מוגדרות",
          noExamsAvailable: "אין בחינות זמינות",
          previous: "הקודם",
          next: "הבא",
        },
        teacherCreateCourseStep4no2: {
          finishExam: "סיום הבחינה",
          finishExamDescription: "לחץ על כפתור שלח כדי לשמור את הקורס",
          previous: "הקודם",
          submit: "שלח",
        },
        // Teacher Create Course end
        // Teacher Profile section start
        teacherProfile: {
          expertise: "מוּמחִיוּת",
          bio: "אודותיך",
          deleteAccount: "מחק חשבון",
          editProfile: "ערוך פרופיל",
          firstName: "שם פרטי",
          firstNameValue: "דר גון",
          lastName: "שם משפחה",
          lastNameValue: "מוחסין",
          username: "שם משתמש",
          usernameValue: "mohsin123",
          email: 'דוא"ל',
          emailValue: "john@gmail.com",
          phoneNumber: "מספר טלפון",
          countryCode: 'ארה"ב (+1)',
          enterPhoneNumber: "הזן מספר טלפון",
          updateProfile: "עדכן פרופיל",
          changePassword: "שנה סיסמה",
          oldPassword: "סיסמה ישנה",
          newPassword: "סיסמה חדשה",
          confirmPassword: "אשר סיסמה",
          update: "עדכן",
        },
        // Teacher Profile section end
        // Delete Account Modal section start
        deleteAccountModal: {
          title: "האם אתה בטוח שברצונך למחוק את החשבון שלך?",
          description:
            "במחיקת החשבון שלך, תאבד גישה לקורסים שלך. עם זאת, שים לב לדברים הבאים:",
          point1:
            "כל ההתקדמות בקורסים שלך, תוצאות מבחנים ונתונים אישיים יימחקו לצמיתות.",
          point2: "לא תהיה לך גישה יותר לקורסים שבהם נרשמת.",
          point3: "פעולה זו אינה ניתנת לשחזור.",
          proceedMessage: "אם אתה בטוח שברצונך להמשיך, לחץ על 'מחק חשבון'.",
          cancelMessage:
            "אם תרצה לשמור על חשבונך ולשמור על גישה לקורסים שלך, לחץ על 'ביטול'.",
          deleteAccount: "מחק חשבון",
          close: "סגור",
        },
        // Delete Account Modal section end
        // Admin sidebar start
        extraMaterial: "חומר נוסף",
        adminSidebar: {
          home: "בית",
          topics: "נושאים",
          teachers: "מורים",
          students: "תלמידים",
          blogs: "בלוגים",
          courses: "קורסים",
          coupon: "קופון",
          myProfile: "הפרופיל שלי",
          subscribedUsers: "משתמשים מנויים",
          logOut: "התנתק",
        },
        // Admin Sidebar end
        // Admin Dashboard Start
        adminDashboard: {
          overAllEarning: "רווח כולל",
          totalCourses: "סך הכל קורסים",
          totalStudents: "סך הכל תלמידים",
          totalTeachers: "סך הכל מורים",
          courses: "קורסים",
          seeAll: "ראה הכל",
        },
        // Admin Dashboard end
        // Admin my courses start
        adminMyCourses: {
          myCourses: "הקורסים שלי",
          newCourse: "קורס חדש",
        },
        // Admin my courses end
        // Admin Course Detail start
        adminCourseDetail: {
          about: "אודות",
          theoreticalMaterial: "חומר תאורטי",
          summaries: "סיכומים",
          exams: "שאלות",
          resourceFolder: "חומרי עזר",
          aboutTheCourse: "אודות הקורס",
          editCourse: "ערוך קורס",
          active: "פעיל",
          reviewsAboutCourse: "ביקורות על הקורס",
          more: "יוֹתֵר",
        },
        // Admin Course Detail end
        // Admin Create Course start
        adminCreateCourseStep1: {
          uploadTopicImage: "העלה תמונת נושא",
          noFileChosen: "לא נבחר קובץ",
          tapToChooseImage: "לחץ כדי לבחור תמונה",
          courseName: "שם הקורס",
          price: "מחיר",
          shortDescription: "תיאור קצר (0/400)",
          selectTopic: "בחר נושא",
          selectSubtopic: "בחר תת-נושא",
          selectSubSubtopic: "בחר תת-תת-נושא",
          previous: "הקודם",
          next: "הבא",
        },
        adminCreateCourseStep2: {
          theoreticalMaterialLink: "קישור לחומר תאורטי",
          enterNameLink: "הזן שם|קישור מופרדים בפסיקים",
          auxiliaryMaterialLink: "קישור לחומר עזר",
          separatePairs: "הפרד כל זוג שם|קישור בפסיק",
          previous: "הקודם",
          next: "הבא",
        },
        adminCreateCourseStep3: {
          summaryTitle: "כותרת סיכום",
          summaryContent: "תוכן סיכום",
          addSummaries: "הוסף סיכומים",
          previous: "הקודם",
          next: "הבא",
        },
        adminCreateCourseStep4no1: {
          examName: "שם מבחן",
          addDefinedExams: "הוסף מבחנים מוגדרים",
          noExamsAvailable: "אין מבחנים זמינים",
          previous: "הקודם",
          next: "הבא",
        },
        adminCreateCourseStep4no2: {
          finishExam: "סיים מבחן",
          submitButtonText: "לחץ על כפתור השמירה כדי לשמור את הקורס",
          previous: "הקודם",
          submit: "שלח",
        },
        // Admin Create Course end
        // Coupon Start
        coupon: {
          couponTitle: "קופון",
          addCoupon: "הוסף קופון",
        },
        // Coupon end
        // Create Coupn Start
        createCoupon: {
          title: "צור קופון",
          titlePlaceholder: "קוד קופון",
          discountPercent: "אחוז הנחה",
          discountPercentPlaceholder: "אחוז הנחה",
          expirationDate: "תאריך תפוגה",
          expirationDatePlaceholder: "dd/mm/yyyy",
          createButton: "צור",
        },
        // Create Coupn end
        // Teachers Section Start
        teachers: {
          title: "מורים",
          name: "שם",
          phone: "טלפון",
          email: "אימייל",
          status: "סטטוס",
          action: "פעולה",
        },
        // Teachers Section End
        // Students Section Start
        students: {
          title: "תלמידים",
          name: "שם",
          phone: "טלפון",
          email: "אימייל",
          action: "פעולה",
        },
        // Students Section End
        // topics Start
        topics: {
          title: "נושאים",
          newTopic: "נושא חדש",
        },
        // topics End
        // Sub-topics start
        subtopics: {
          title: "תת-נושאים",
          newSubTopic: "תת-נושא חדש",
        },
        // Sub-topics end
        // Sub sub-topics start
        subSubtopics: {
          title: "תת-תת-נושאים",
          newSubSubTopic: "תת-תת-נושא חדש",
        },
        // Sub sub-topics end

        // for add new topic modal start
        addNewTopic: {
          heading1: "הוסף נושא חדש",
          heading2: "הוסף נושא משנה חדש",
          heading3: "הוסף תת-תת-נושא חדש",
          editTopic1: "ערוך נושא",
          editTopic2: "ערוך נושא משנה",
          editTopic3: "ערוך תת-תת-נושא",
          title: "כּוֹתֶרֶת",
          description: "תֵאוּר",
        },
        // for add new topic modal end
        // topic, subtopic and sub subtopic modal buttons start
        modalButtons: {
          addTopic: "הוסף נושא",
          addSubtopic: "הוסף נושא משנה",
          addSubSubtopic: "הוסף משנה משנה",
          cancel: "לְבַטֵל",
        },
        // topic, subtopic and sub subtopic modal buttons end

        pleaseWait: "אנא המתן...",
        loading: "טוען...",
        question: "שאלות",
        wrongQuestion: "שאלות שטעיתי בהן",
        btnOne: "התחל אנימציה",
        btnTwo: "עצור אנימציה",
        addNewExam: "+ הוסף בחינה חדשה",
        saveExam: "שמור בחינה",
        saving: "שומר...",
        createSummaries: "+ צור סיכומים",
        viewContent: "הצג תוכן",
        hideContent: "הסתר תוכן",
        //after login faqs
        helpful: "האם תשובה זו הייתה מועילה?",
        back: "בְּחֲזָרָה",
        yes: "כֵּן",
        no: "לֹא",
        openChat: "פתח את צ'אט",
        chatHelp: "צריך עזרה נוספת? צ'אט עם התמיכה שלנו.",
        // for blogs page
        blogs: {
          heading: "בלוגים",
          readMore: "קרא עוד",
        },
        blogsSidebar: {
          heading: "קטגוריות",
        },
        // for Add blogs page
        addBlogs: {
          submitting: "הַגָשָׁה",
          success: "בלוג נוסף",
          heading: "הוסף בלוג חדש",
          title: "כותרת",
          titlePlaceholder: "הכנס כותרת בלוג",
          image: "תמונת מיני",
          imagePlaceholder: "תמונת מיני",
          category: "בחר קטגוריה",
          categoryPlaceholder: "בחר קטגוריה",
          tags: "תגיות",
          tagsPlaceholder: "הכנס תגיות, לחץ Enter או פסיק כדי להוסיף",
          description: "תיאור הבלוג",
          descriptionPlaceholder: "תיאור",
          btn: "הוסף בלוג",
        },
        // for blogstable page
        blogsTable: {
          heading1: "תמונה",
          heading2: "שם",
          heading3: "תיאור",
          heading4: "צפה בפרטים",
          heading5: "פעולות",
          addCategory: "הוסף קטגוריה",
        },
        //for edit blog modal
        editBlogModal: {
          title: "ערוך בלוג",
          titleLabel: "כותרת הבלוג",
          descriptionLabel: "תיאור הבלוג",
          saveChanges: "שמור שינויים",
          close: "סגור",
        },
        // for Add category page
        addCategory: {
          heading: "הוסף קטגוריה חדשה",
          title: "כותרת",
          titlePlaceholder: "הזן כותרת קטגוריה",
          description: "תיאור קטגוריה",
          descriptionPlaceholder: "תיאור",
          btn: "הוסף קטגוריה",
          loading: "אנא המתן",
          successMessage: "קטגוריה נוספה בהצלחה",
        },
        // for editAbleModal
        editableModal: {
          title: "ערוך פריט",
          cancel: "ביטול",
          save: "שמור",
          areYouSure: "האם אתה בטוח שברצונך למחוק",
          delete: "מחק",
          thisItem: "פריט זה",
          actionCannotBeUndone: "פעולה זו לא ניתנת לביטול.",
        },
        // for my account page start
        purchase: "רכישות",
        courses: "קורסים",
        getInTouch: "לְהִתְקַשֵׁר",
        // for my account page end
      },
    },
  },
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
