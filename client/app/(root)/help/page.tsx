import React from 'react'

const help = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-full">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            About This App
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="bg-gradient-to-br from-pink-50/80 to-purple-50/80 dark:from-pink-950/20 dark:to-purple-950/20 rounded-3xl p-8 border border-pink-200/50 dark:border-pink-800/30 backdrop-blur-sm shadow-lg">
          <div className="text-center mb-8">
            <span className="text-6xl">💝</span>
          </div>
          
          <div className="prose prose-lg max-w-none text-center space-y-6">
            <p className="text-xl font-medium text-foreground/90 italic">
              This app is not just a tool. It is a story — a story of love, mistakes, realization, and a promise kept.
            </p>
            
            <div className="text-left space-y-4 text-foreground/80 leading-relaxed">
              <p>
                Once upon a time, a girl felt unseen, unheard, and deeply hurt by the very person she trusted with her heart. In his immaturity, he failed to treat her the way she deserved — with respect, gentleness, and care. She carried the pain of insecurity, silence, and heartbreak.
              </p>
              
              <p>
                But love has a way of awakening people. Over time, the boy changed. He learned what it means to truly love — to listen, to respect, to protect, and to stand as a partner with responsibility. With every step, he began to rebuild trust, not with words alone but with actions that showed his heart.
              </p>
              
              <p>
                This app is one such action. Created exclusively for her, it is his way of saying:
              </p>
              
              <div className="bg-gradient-to-r from-yellow-100/80 to-pink-100/80 dark:from-yellow-900/30 dark:to-pink-900/30 rounded-2xl p-6 border-l-4 border-pink-400 my-6">
                <p className="text-lg font-semibold text-center italic">
                  ✨ &ldquo;You are seen. You are heard. You are cherished. And your dreams matter to me as much as you do.&rdquo; ✨
                </p>
              </div>
              
              <p>
                Just as Shah Jahan built the Taj Mahal for Mumtaz as a symbol of eternal love, this app stands as a modern-day monument — not of marble, but of effort, time, research, patience and dedication. A gift that lives in the digital world, yet carries the same timeless essence of love and devotion.
              </p>
              
              <p>
                Every line of code, every feature, every design is a reflection of how much she means to him. It is a small reminder that love is not only about grand gestures, but also about building something meaningful that supports, uplifts, and celebrates the one who matters most.
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
                  A promise that from now on, she will never feel unseen, unheard, or unimportant again.
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
              With all my love, for Ammu
            </p>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-gradient-to-br from-green-50/80 to-blue-50/80 dark:from-green-950/20 dark:to-blue-950/20 rounded-3xl p-8 border border-green-200/50 dark:border-green-800/30 backdrop-blur-sm shadow-lg">
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
                Support & Help
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-blue-600 mx-auto rounded-full"></div>
            </div>
            
            <div className="flex justify-center">
              <span className="text-5xl">🛠️</span>
            </div>
            
            <div className="space-y-4">
              <p className="text-lg text-foreground/80">
                Need help with the app or have any questions? We&apos;re here to support you on your journey!
              </p>
              
              <div className="bg-white/60 dark:bg-gray-900/40 rounded-2xl p-6 border border-green-200/50 dark:border-green-700/30 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-2xl">📞</span>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground font-medium">For Support Call</p>
                      <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                        Chinnu Babyyy
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-2xl">✉️</span>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground font-medium">Email Support</p>
                      <a 
                        href="mailto:ammuchinnu011@gmail.com" 
                        className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline transition-all duration-200 hover:scale-105"
                      >
                        ammuchinnu011@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-green-200/50 dark:border-green-700/30">
                  <p className="text-sm text-muted-foreground italic">
                    💝 Remember, you&apos;re never alone in this journey. Reach out anytime you need help!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default help