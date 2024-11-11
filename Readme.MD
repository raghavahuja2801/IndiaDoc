# Global Health Platform

A comprehensive **Full-Stack Platform** designed to provide worldwide access to online doctor consultations and affordable bulk ordering of medicines. The platform also has future potential for a **medical tourism** feature, connecting users with healthcare providers and affordable treatment options in specific regions.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
  
## Overview

Global Health Platform aims to break down geographical and financial barriers to healthcare by offering:
1. **Virtual Doctor Consultations**: Connect with licensed doctors worldwide through secure video calls.
2. **Affordable Medicine Access**: Order medicines in bulk at lower prices and have them shipped internationally.
3. **Potential Medical Tourism Services**: A future addition to the platform will enable users to connect with healthcare providers in other regions for cost-effective treatment options.

## Features

- **Doctor Consultations**: Schedule and join virtual consultations with doctors worldwide.
- **Prescription Management**: Store, view, and manage prescriptions securely.
- **Bulk Medicine Orders**: Order medications in bulk at discounted rates.
- **Payment Integration**: Secure payment methods for consultations and medication orders.
- **User Profile and History**: Keep track of consultations, orders, and medical history.
- **Future Medical Tourism**: Allow users to explore medical tourism options.

## Tech Stack

- **Frontend**: Angular, HTML, CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT
- **Video Conferencing**: Zoom API
- **Deployment**: Docker, Kubernetes, Cloud Provider (e.g., AWS, Google Cloud)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/GlobalHealthPlatform.git
   cd GlobalHealthPlatform
   ```

Configure environment variables for backend (MongoDB URI, Zoom API keys, etc.)

Run the backend server:
    ```bash
    npm start
    ```
Run the frontend server:
    ```bash
    cd ../frontend
    npm start
    ```




### Usage

1. Register as a user or healthcare provider.

2. For Users:
   - Browse doctors by specialty and region.
   - Schedule a consultation and join the call at the scheduled time.
   - Place bulk orders for medicines, view prices, and track shipping.

3. For Providers:
   - Set up a profile and availability for consultations.
   - Manage patient interactions and prescriptions.

### Future Enhancements

- **Medical Tourism**: Users can explore and book treatments abroad, with guidance on travel and accommodation.
- **Advanced Analytics**: Track and analyze user data for healthcare insights.
- **AI-Assisted Recommendations**: Suggest doctors, medicines, and treatment options based on user history.

### Contributing

Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request. Make sure to follow the code of conduct.

### License

Distributed under the MIT License. See `LICENSE` for more information.
