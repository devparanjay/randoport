# randoport - Requirements Document

## Core Objective
A modern, fast website allowing developers, testers, and operators to quickly find safe, non-conflicting network ports for their applications.

## Functional Requirements (REQs)
- **REQ-1:** Generate random port numbers from safe ranges (e.g., bypassing 0-1023 well-known ports).
- **REQ-2:** Maintain an internal list of commonly used registered ports (e.g., 3000, 3306, 5432, 8080, 6379) to avoid suggesting them.
- **REQ-3:** Allow users to specify the number of ports they need.
- **REQ-4:** Allow users to select options/environment (e.g., Ephemeral range 49152-65535, or Registered unassigned range 1024-49151).
- **REQ-5:** Provide a "Find Ports" button to trigger the port generation.
- **REQ-6:** Display the generated ports clearly, allowing easy copying to the clipboard.

## Non-Functional Requirements
- **NFR-1:** Modern, fast, and smooth UX. No user accounts or database backend required (pure frontend app).
- **NFR-2:** UI must be beautiful, dark theme by default, and have a futuristic look.
- **NFR-3:** Built using Google Stitch for UI/UX design and frontend components.
