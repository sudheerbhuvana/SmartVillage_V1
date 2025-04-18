'use client'
import './mission.css'
import Link from 'next/link'

export default function MissionPage() {
  const handleDownload = () => {
    // Add download logic here
    console.log('Downloading SVR book...')
  }

  return (
    <div className="mission-container">
      <div className="mission-content">
        <div className="top-nav">
          <Link href="/" className="back-button">
            ← Back to Home
          </Link>
          <Link href="/objectives" className="back-button">
            Objectives →
          </Link>
        </div>

        <h1 className="mission-header">
          Our Vision & Mission
        </h1>

        <section className="section-card">
          <h2 className="section-title">Our Vision</h2>
          <p className="section-text">
            Our vision is to develop model villages with progressive and dynamic features, 
            while ensuring the holistic development of students through active community 
            engagement and real-time projects.​
          </p>
        </section>

        <section className="section-card">
          <h2 className="section-title">Our Mission</h2>
          <p className="section-text">
            To impart quality higher education and to undertake research and extension with 
            emphasis on application and innovation that cater to the emerging societal needs 
            through all-round development of the students of all sections enabling them to be 
            globally competitive and socially responsible citizens with intrinsic values  ​
          </p>
        </section>
      </div>
    </div>
  )
}
