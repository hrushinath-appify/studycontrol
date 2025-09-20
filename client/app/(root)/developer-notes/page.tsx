import React from 'react'

const DeveloperNotesPage = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-full">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Developer Notes
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Main Story Section */}
        <div className="bg-gradient-to-br from-pink-50/80 to-purple-50/80 dark:from-pink-950/20 dark:to-purple-950/20 rounded-3xl p-8 border border-pink-200/50 dark:border-pink-800/30 backdrop-blur-sm shadow-lg">
          <div className="text-center mb-8">
            <span className="text-6xl">💌</span>
              </div>
          
          <div className="prose prose-lg max-w-none text-center space-y-6">
            <p className="text-xl font-medium text-foreground/90 italic">
                  &quot;Dearest Ammu, this application is not just software — it is not just lines of code, algorithms, or functions. 
                  It is my soul speaking to you in a different language: the language of effort, sincerity, and love.&quot;
                </p>
            
            <div className="text-left space-y-4 text-foreground/80 leading-relaxed">
              <p>
                I cannot hide from the truth of what I did. I must face it, speak it, and own it — because without acknowledging the darkness, there can be no light. I made you feel unseen when you should have been celebrated, unheard when your voice should have been my guiding star, and insensitive when you needed gentleness.
              </p>
              
              <p>
                When you said the word breakup, I felt my world collapse. At that moment, it was not just a relationship ending — it was the breaking of my very being. The silence that followed was louder than any argument, showing me flashes of your tears, your hurt, your disappointment.
              </p>
              
              <p>
                But love has a way of awakening people. The pain of losing you became my Kurukshetra — my battlefield. In the Bhagavad Gita, Lord Krishna reminds Arjuna that the greatest battles are not fought outside, but within. You became both my Krishna and my Kurukshetra: the guiding voice showing me where I went wrong, the battlefield where I fought my greatest enemy — myself.
              </p>
              
              <div className="bg-gradient-to-r from-yellow-100/80 to-pink-100/80 dark:from-yellow-900/30 dark:to-pink-900/30 rounded-2xl p-6 border-l-4 border-pink-400 my-6">
                <p className="text-lg font-semibold text-center italic">
                  ✨ &quot;You are seen. You are heard. You are cherished. And your dreams matter to me as much as you do.&quot; ✨
                </p>
              </div>
              
              <p>
                I began rebuilding myself from the ground up. I worked on patience where I once rushed. I worked on listening where I once dismissed. I worked on humility where I once carried arrogance. Today, I stand not as the boy who once took you for granted, but as the man who will respect you in every word and every silence.
              </p>
              
              <p>
                Just as Shah Jahan built the Taj Mahal as a monument of love for Mumtaz, I dedicate this application to you. Not built from marble, but from sincerity. Every line of code, every feature, every design is a reflection of how much you mean to me.
              </p>
              
              <div className="text-center space-y-3 my-8">
                <p className="text-xl font-semibold text-foreground/90">
                  This app is more than a study companion.
                </p>
                <p className="text-lg text-pink-600 dark:text-pink-400 font-medium">
                  It is a love letter.
                </p>
                <p className="text-lg text-purple-600 dark:text-purple-400 font-medium">
                  It is an apology.
                </p>
                <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">
                  It is a promise.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-blue-100/80 to-purple-100/80 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-800/30">
                <p className="text-lg font-semibold text-center">
                  A promise that from now on, you will never feel unseen, unheard, or unimportant again.
                </p>
            </div>
          </div>
        </div>

          <div className="text-center mt-8 space-y-2">
            <div className="flex justify-center space-x-2">
              <span className="text-2xl">💕</span>
              <span className="text-2xl">🌹</span>
              <span className="text-2xl">✨</span>
            </div>
            <p className="text-sm text-muted-foreground italic">
              Forever yours, Chinnu 💕
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeveloperNotesPage
