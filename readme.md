# 👩‍💼 Underwaise

> *Because every great insurance decision deserves to be made in comfortable underwear.*

[![BaselHack 2025](https://img.shields.io/badge/BaselHack-2025-orange)](https://baselhack.ch)
[![Prize](https://img.shields.io/badge/Prize-CHF%201%2C500-gold)](https://baselhack.ch)
[![Sponsor](https://img.shields.io/badge/Sponsor-PAX-blue)](https://www.pax.ch)

## 🎯 What is this madness?

Welcome to **Underwaise** – the AI-powered underwriting revolution that emerged from the creative chaos of BaselHack 2025! We're automating insurance underwriting so efficiently, you'd think we had a crystal ball. (Spoiler: It's actually machine learning, but don't tell the VCs.)

Born during a caffeine-fueled weekend in Basel, this project transforms the soul-crushing manual process of insurance risk assessment into a sleek, AI-driven experience that would make even the most pessimistic actuaries crack a smile.

# 🧠 What We Built

Our goal was to **automate and enhance the underwriting process** for pax. The main focus areas were:

* Using **LLMs** to structure and evaluate unstructured free-text application forms  
* Training **machine learning models** to challenge and improve existing business rules  
* Developing **ML-based automation** for manual user tasks to accelerate and streamline the process  

---

## 🧩 Modules

* **underwaise-app** – Frontend application for online life insurance applications  
* **underwaise-process-engine** – BPMN-based engine implementing the complete underwriting workflow, ensuring traceability and maintainability  
* **underwaise-ai/analyze_form** – AI service for parsing, structuring, and evaluating application forms using LLMs  
* **underwaise-ai/evaluate_application** – Custom ML model designed to validate and enhance business rules  

---

## 🍴 Tech Stack

* **Frontend:** [Next.js](https://nextjs.org/) (TypeScript)  
* **Process Engine:** [Cibseven](https://cibseven.org/) (Camunda fork), [Spring Boot](https://spring.io/projects/spring-boot) (Java)  
* **Form Analysis:** [FastAPI](https://fastapi.tiangolo.com/), [LangChain](https://www.langchain.com/) (Python)  
* **Application Evaluation:** [FastAPI](https://fastapi.tiangolo.com/), [scikit-learn](https://scikit-learn.org/stable/) (Python)  

---

## 🚀 CI/CD

* **GitHub Actions** for continuous integration and delivery  
* **Azure Deployment** using Serverless Azure SQL, Container Apps, and Azure AI (OpenAI GPT-5 model)


## 🎪 The Dream Team

Meet the magnificent humans who sacrificed their weekend sleep schedules:

- **Artur** 🍃 - Spring Boot Master
- **Regjep** ⚡ - Fast.js
- **Valentino** 🎩✨ - The Magician
- **Kathrin** 🏥🍬 - Insurance Queen & Sweet Supplier
- **Sebastian** 🤖🧠 - ML AI Expert
- **Morris** 🤖❤️ - The AI LL Expert
- **Litty** 📋💼 - Insurance Tech Expert
- **David** ☕️ - Old School Java Programmer

*Eight developers entered. One solution emerged. Zero regrets (maybe a few on Monday morning).*

## 🙏 Acknowledgments

- **PAX** for the awesome challenge and believing that insurance can be fun
- **BaselHack organizers** for the venue, food, drinks, and generally enabling our hackathon addiction
- **Our families** for understanding why we disappeared for a weekend
- **Caffeine** for obvious reasons

## 💬 Final Words

We came, we coded, we conquered (mostly). This project represents what happens when you give a group of passionate developers a real-world problem, some deadline pressure, and unlimited access to snacks.

Insurance underwriting will never be the same again. You're welcome, world.

## 📜 License

MIT License – Because sharing is caring, and we want the world to benefit from better insurance underwriting.

See [LICENSE](LICENSE) for details.

---

*Built with ❤️ (and copious amounts of coffee) at BaselHack 2025*

