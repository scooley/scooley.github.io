---
layout: single
title: "My work"
permalink: /resume/
author_profile: true
author: scooley
toc: true
toc_label: "On this page"
toc_sticky: true
---

I'm a technical product manager who has spent 15 years building platforms and products, from containers on Windows to AI safety tools. I was a people manager for four years and loved it; helping people achieve great things is my favorite.

Since product manager can mean many things - I like deciding what to build, for whom, and why it matters.  Said another way, I like understanding what people need and making complicated problems easier to work on.

## My top hits

<span aria-hidden="true">🧠</span> **[Making AI memory safer](#ai-memory-and-agent-safety)** - I turned an emerging risk into practical guidance, tools, and measurable security policy.

<span aria-hidden="true">☁️</span> **[Taking Kubernetes beyond the cloud](#kubernetes-at-the-edge)** - I led a five-person product team building for datacenters, factories, and smaller edge devices.

<span aria-hidden="true">🥽</span> **[Scaling mixed reality in secure environments](#making-hololens-manageable-at-scale)** - I made it possible for HoloLens and IVAS customers to confidently deploy what is, essentially, a cloud-connected camera array into high security environments.

<span aria-hidden="true">🛠️</span> **[Building tools for developers](#windows-linux-and-containers)** - I helped ship the Windows Subsystem for Linux and launch containers on Windows.

## How I like to work

I want to build delightful tools and experiences with my friends.

I talk to customers early and stay close as they move from running an experiment to production integration. Direct conversations, bug reports, and product data all tell different parts of the customer story.  I use what I learn to decide what to build, what to improve, and what to stop doing.  Bringing the team (and leaders) along is critical; making sure we agree on a shared direction with clear goals and strategy lets everyone do their best work.

I enjoy helping people.  I like coaching, teaching, and sharing.  I have a knack for working across organizational boundaries and explaining technical decisions to people with different backgrounds

My technical home is building platforms: operating systems, virtualization, containers, identity, and security. I've worked with developers, enterprise IT teams, and partners across cloud, datacenter, and edge environments.

## The longer story

These roles have all been at Microsoft but on different teams with quite a few different customers and problems along the way.

### AI memory and agent safety

**Principal AI Security Program Manager — AI Safety and Security**<br>
*October 2025 to November 2026*

AI systems that remember things introduce a new set of safety questions. I own AI memory risk and policy across Microsoft: writing [best practices published on Microsoft Learn](https://learn.microsoft.com/en-us/security/zero-trust/sfi/manage-agentic-memory-safety), bringing teams together through a Memory Safety Working Group, and teaching through forums including the AI Safety Summit and BlueHat AI Safety Village.

To make policy coverage measurable, I built an early, query-based inventory spanning **135,000+ repositories**. It gave us Microsoft's first coverage metric for AI security policy and a starting point for automating checks.

I also took [Clarity Agent](https://github.com/microsoft/clarity-agent), a tool for thinking through risks earlier in development, from hackathon project to open-source release. Alongside contributions to [RAMPART](https://github.com/microsoft/RAMPART) and [PyRIT](https://github.com/microsoft/PyRIT), that work led to mapping where our AI safety tools fit in the development process and working with the [AI Red Team](https://learn.microsoft.com/en-us/security/ai-red-team/) on automating red-team operations.

### Protecting the systems other systems depend on

**Security Operations Engineering Lead — CISO protections team**<br>
*September 2024 to October 2025*

I hired a team to put Microsoft's Trusted Computing Base program into practice. These are foundational services that other systems depend on for security. We used the [Secure Future Initiative](https://www.microsoft.com/en-us/trust-center/security/secure-future-initiative) to prioritize the work and brought **10 business groups** on board.

One focus was keeping credentials from crossing boundaries they shouldn't. I drove work to revoke **3,700+ production certificates** from non-production environments and advanced cross-boundary credential isolation to **98.7% company-wide**. [Read the July 2026 progress report](https://www.microsoft.com/en-us/trust-center/security/secure-future-initiative/sfi-progress-report-july-2026).

### Kubernetes at the edge

**Principal Program Manager Lead — Arc enabled AKS**<br>
*May 2021 to September 2024*

I led a team of five product managers bringing Azure Kubernetes Service (AKS) beyond the cloud. Our work grew from running Kubernetes in datacenters to supporting smaller devices with [AKS Edge Essentials](https://learn.microsoft.com/en-us/azure/aks-hybrid-edge/edge-essentials/aks-edge-overview).

The customer stories make this work tangible:

- [Emirates Global Aluminium](https://www.microsoft.com/en/customers/story/1777264680029793974-ega-azure-arc-discrete-manufacturing-en-united-arab-emirates) built a manufacturing platform that cut image and video analytics costs by **86%**, with **13× faster AI response times**.
- [ABB](https://www.microsoft.com/en/customers/story/1705722215075384871-abb-aks-edge-essentials-discrete-manufacturing-switzerland-en/) unified application deployment across edge and cloud, cutting development and deployment time in half.

I built a customer program that followed early adopters from proof of concept toward production. Connecting those conversations to product data helped us choose where to invest: new features, experiments, or making the existing product better. I also led planning, release decisions, and quality and support reviews.

Our team health and leadership-confidence scores were above the Microsoft and organization averages. I also helped deliver hybrid AKS features and contributed evidence supporting [Microsoft's recognition in Gartner's 2023 distributed hybrid infrastructure report](https://azure.microsoft.com/en-us/blog/microsoft-recognized-as-a-leader-in-2023-gartner-magic-quadrant-for-distributed-hybrid-infrastructure/).

### Making HoloLens manageable at scale

**Senior Program Manager — HoloLens**<br>
*April 2019 to May 2021*

Buying hundreds of headsets is only useful if you can deploy, maintain, and secure them. I made sure enterprise IT could recieve a palate full of HoloLens 2 then deploy and manage them securely in their infrastructure.  I built the roadmap and shiped major releases twice a year for customers and partners.  Some key items included MDM support for Hololens, Autopilot pre-provisioning, and unattend install from USB.

I also worked on secure device deployment for the [Integrated Visual Augmentation System (IVAS) program](https://news.microsoft.com/source/features/digital-transformation/u-s-army-to-use-hololens-technology-in-high-tech-headsets-for-soldiers/), whose production contract was valued at up to $22 billion. That meant working through strict security requirements and assessments for devices used at the tactical edge.

### Windows, Linux, and containers

**Senior Program Manager — Hyper-V**<br>
*December 2013 to April 2019*

I owned Hyper-V's boundary between a virtual machine and the operating system running it (guest <-> host interface). That work reached everyone from individual developers to enterprise customers and Azure.

Three projects stand out:

- **[Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/about):** working with Canonical to bring a native Ubuntu command-line experience to Windows.
- **[Windows containers](https://learn.microsoft.com/en-us/virtualization/windowscontainers/about/):** owning launch documentation with Docker and helping Microsoft 365, Azure Functions, Cosmos DB, and Azure Stream Analytics adopt containers to scale and reduce operating costs.  This was built on grpc with custom interfaces to container management integrated into containerd via an runc Windows adaptation ([runhcs](https://github.com/microsoft/hcsshim)).
- **[Guest-host communication](https://learn.microsoft.com/en-us/windows-server/virtualization/hyper-v/make-integration-service):** designing a socket-based channel that partners could build on, later used by Visual Studio Code extensions and core Azure infrastructure.

Building community around the new Windows container ecosystem was a big part of my job.  I spent a lot of time blogging, speaking, writing documentation, mentoring, and helping with the Women in Base employee resource group.

### Data insights

**Program Manager — SQL**<br>
*September 2011 to December 2013*

I worked on a small prototype team in SQL building tools to derive insights on unstructured data streams.  I was directly responsible for an interactive HTML5/JavaScript charting library designed to make data analysis more accessible. I helped define the product, brought the customer perspective into design, owned documentation, and worked across teams on the roadmap.  Our charting library became the basis for PowerBI's cross-chart interactive data filtering/hilighting.

## Teaching and community

Teaching and mentoring have been a thread throughout my career, alongside helping with hiring and recruiting. I've also enjoyed sharing what I've learned at conferences, with speaker scores consistently at 4.7/5.

### Talks, interviews, and podcasts

| Recording | Year | Topic | Audience / context |
| --- | --- | --- | --- |
| [AKS hybrid at Microsoft Ignite](https://www.youtube.com/watch?v=tpzqWuX6-G8) | 2022 | Hybrid AKS, Azure Arc, and Kubernetes at the edge | Interview with Matt McSpirit at Microsoft Ignite |
| [Windows Subsystem for Linux — MS Dev Show #192](https://www.youtube.com/watch?v=WwP9g0ckhEE) | 2018 | Windows Subsystem for Linux | Podcast with Tara Raj |
| [Set up a Windows dev environment that feels like $HOME](https://learn.microsoft.com/en-us/shows/build-2018/brk3505) | 2018 | WSL, VS Code, and Hyper-V for Linux development on Windows | Microsoft Build; co-presented with Tara Raj.  ~300 person audience |
| [We put Linux in your Windows](https://www.youtube.com/watch?v=JZCPYWrTLTg) | 2018 | WSL and Linux tooling for web developers | SFHTML5 meetup in San Francisco |
| [PowerShell Direct interview](https://www.youtube.com/watch?v=xVzgPGwMb-s) | 2015 | Managing Hyper-V virtual machines with PowerShell Direct | Interview with Carsten Rachfahl at Microsoft Ignite |

### Teaching and volunteering

- **Hunt the Wumpus** - teacher, 2026
- **TEALS, Academy for Precision Learning** — teacher, 2016 - 2018.
- **Society of Women Engineers** — Saturday Academy, Computational Thinking Dinner, and other events.
- **Oregon State University, School of Electrical Engineering and Computer Science** — computer science lab teaching assistant, January 2009 to September 2011.
- **Oregon State University, Open Source Lab and Linux Users Group** — March 2006 to September 2011. - I organized the first 3 Beaver Bar Camps and content for the monthly Linux User Group meetings.

## Where I started

**Oregon State University – Class of 2011**<br>
B.S. Electrical and Computer Engineering, B.S. Computer Science.

I got my start in tech at the [OSU Open Source Lab](https://osuosl.org/) — a sneaky, student run, 5-9s uptime datacenter that hosted lots of critical software like early FireFox, kernel.org, and many package mirrors.  It was a wonderful place to learn by doing. I worked on media software (Watch and Listen) for One Laptop per Child, and found a community around open source: the Linux Users Group, hackathons, and weekly coding socials.

Outside of work, I'm usually remodeling my house, reading, hiking, traveling, teaching, or cycling through different crafts.
