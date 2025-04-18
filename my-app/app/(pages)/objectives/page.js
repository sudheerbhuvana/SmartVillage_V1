'use client'
import './objectives.css'
import Link from 'next/link'

export default function ObjectivesPage() {
  return (
    <div className="objectives-container">
      <div className="objectives-content">
        <div className="top-nav">
          <Link href="/" className="back-button">
            ← Back to Home
          </Link>
        </div>

        <h1 className="objectives-header">
          Our Objectives
        </h1>

        <section className="section-card">
          <h2 className="section-title">Key Objectives</h2>
          <ul className="objectives-list">
            <li>Active Engagement in Problem Solving</li>
            <li>Promotion of technological Innovations</li>
            <li>Inculcation of social responsibility</li>
            <li>Empowerment as catalyst for change</li>
            <li>Bridging the gap between education and action</li>
            <li>Development of entreprenuer mind set</li>
            <li>Transferring gram into adarsh grams</li>
          </ul>
        </section>
      </div>
    </div>
  )
} 