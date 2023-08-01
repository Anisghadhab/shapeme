import React from 'react';
import { Link } from 'react-router-dom';
const Introduction = () => {
    const containerStyle = {
        margin: '0 auto',
        maxWidth: '1200px',
    };

    const headerStyle = {
        backgroundColor: '#303030',
        color: '#ffffff',
        padding: '16px 0',
    };

    const heroSectionStyle = {
        backgroundImage: 'url(background-image.jpg)', // Replace with the actual background image URL
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        color: '#ffffff',
        padding: '32px 0',
    };

    const buttonStyle = {
        marginTop: '8px',
        padding: '6px 12px',
        backgroundColor: '#ff0000',
        color: '#ffffff',
        fontWeight: 'bold',
        borderRadius: '9999px',
        cursor: 'pointer',
        textDecoration: 'none'
    };

    const sectionStyle = {
        padding: '16px 0',
        backgroundColor: '#f4f4f4',
    };

    const featureStyle = {
        backgroundColor: '#ffffff',
        padding: '16px 24px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    };

    return (
        <div>
            <header style={headerStyle}>
                <div style={containerStyle}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Welcome to Shapeme</h1>
                    <p style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>Stay Fit. Stay Healthy.</p>
                </div>
            </header>

            <div style={heroSectionStyle}>
                <div style={containerStyle}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Get Fit with Us</h2>
                    <p style={{ fontSize: '1.25rem', marginTop: '1rem' }}>Join our gym and experience a healthier lifestyle.</p>
                    <button style={buttonStyle}> <Link to={'/login'} >Join Now</Link> </button>
                </div>
            </div>

            <section style={sectionStyle}>
                <div style={containerStyle}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                        <div style={featureStyle}>
                            {/* <img src="dfdf.png" alt="Feature 1" style={{ margin: '0 auto', marginBottom: '1rem', width: '100px', height: '100px', borderRadius: '50%' }} /> */}
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Creating Workout Routines</h3>
                            <p style={{ color: '#666666' }}>Create a routine and add sets, kg, and reps to track your progress.</p>
                        </div>
                        <div style={featureStyle}>
                            {/* <img src="qsddd.png" alt="Feature 2" style={{ margin: '0 auto', marginBottom: '1rem', width: '100px', height: '100px', borderRadius: '50%' }} /> */}
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Tracking Progress</h3>
                            <p style={{ color: '#666666' }}>Track all your gym progress and status.</p>
                        </div>
                        <div style={featureStyle}>
                            {/* <img src="qsdq.png" alt="Feature 3" style={{ margin: '0 auto', marginBottom: '1rem', width: '100px', height: '100px', borderRadius: '50%' }} /> */}
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Community Support</h3>
                            <p style={{ color: '#666666' }}>Be a part of our fitness community and get motivated together.</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer style={headerStyle}>
                <div style={containerStyle}>
                    <p>&copy; 2023 Shapeme. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Introduction;
