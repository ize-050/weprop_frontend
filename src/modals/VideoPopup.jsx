'use client'
import { useState } from 'react'

const VideoPopup = ({ isVideoOpen, setIsVideoOpen, videoId = 'tUP5S4YdEJo' }) => {
  if (!isVideoOpen) return null

  return (
    <>
      <div 
        className="modal fade show d-block" 
        style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
        onClick={() => setIsVideoOpen(false)}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="btn-close position-absolute top-0 end-0 m-3"
              style={{ zIndex: 1, backgroundColor: 'white', opacity: 1 }}
              onClick={() => setIsVideoOpen(false)}
              aria-label="Close"
            ></button>
            <div className="modal-body p-0">
              <div className="ratio ratio-16x9">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title="YouTube video"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default VideoPopup
