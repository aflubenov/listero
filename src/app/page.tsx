"use client"
//import '@/app/scss/bootstrap.scss'
//import '@/app/overrides.scss'

export default function Home() {

  return (
    <>
      <header className="bg-gray-800 text-white py-4 px-8">
        <div className="flex justify-between items-center">
          <img src="logo.png" alt="Logo" className="w-16" />
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:text-gray-400">Home</a></li>
              <li><a href="#" className="hover:text-gray-400">Features</a></li>
              <li><a href="#" className="hover:text-gray-400">FAQ</a></li>
              <li><a href="#" className="hover:text-gray-400">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="hero bg-cover bg-center text-white py-40" style={{ backgroundImage: "url('https://source.unsplash.com/featured/1280x720/?list')" }}>
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-4">Create Your Dream List</h1>
          <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full">Get Started</a>
        </div>
      </section>

      <section className="features bg-gray-100 py-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="feature-card bg-white p-6 shadow-lg rounded-lg text-center">
              <i className="fas fa-rocket text-5xl text-blue-500 mb-4"></i>
              <h2 className="text-2xl font-bold mb-4">Powerful</h2>
              <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, elit at scelerisque egestas.</p>
              <a href="#" className="text-blue-500 hover:underline">Learn More</a>
            </div>
            <div className="feature-card bg-white p-6 shadow-lg rounded-lg text-center">
              <i className="fas fa-cog text-5xl text-blue-500 mb-4"></i>
              <h2 className="text-2xl font-bold mb-4">Customizable</h2>
              <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, elit at scelerisque egestas.</p>
              <a href="#" className="text-blue-500 hover:underline">Learn More</a>
            </div>
            <div className="feature-card bg-white p-6 shadow-lg rounded-lg text-center">
              <i className="fas fa-users text-5xl text-blue-500 mb-4"></i>
              <h2 className="text-2xl font-bold mb-4">Collaborative</h2>
              <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, elit at scelerisque egestas.</p>
              <a href="#" className="text-blue-500 hover:underline">Learn More</a>
            </div>
          </div>
        </div>
      </section>

      <section className="individual-feature bg-gray-200 py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="feature-section bg-white p-8 rounded-lg shadow-lg flex items-center">
              <div className="mr-8">
                <img src="https://source.unsplash.com/featured/1280x720/?feature1" alt="Feature 1" className="w-48" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Feature 1</h2>
                <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, elit at scelerisque egestas.</p>
                <a href="#" className="text-blue-500 hover:underline">Learn More</a>
              </div>
            </div>
            <div className="feature-section bg-white p-8 rounded-lg shadow-lg flex items-center">
              <div className="mr-8">
                <img src="https://source.unsplash.com/featured/1280x720/?feature2" alt="Feature 2" className="w-48" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Feature 2</h2>
                <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, elit at scelerisque egestas.</p>
                <a href="#" className="text-blue-500 hover:underline">Learn More</a>
              </div>
            </div>
            <div className="feature-section bg-white p-8 rounded-lg shadow-lg flex items-center">
              <div className="mr-8">
                <img src="https://source.unsplash.com/featured/1280x720/?feature3" alt="Feature 3" className="w-48" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Feature 3</h2>
                <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, elit at scelerisque egestas.</p>
                <a href="#" className="text-blue-500 hover:underline">Learn More</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonial bg-gray-200 py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="testimonial-card bg-white p-8 rounded-lg shadow-lg text-center animate__animated animate__fadeInLeft">
              <p className="mb-4">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, elit at scelerisque egestas."</p>
              <p className="font-bold">John Doe</p>
              <p className="text-gray-600">CEO</p>
            </div>
            <div className="testimonial-card bg-white p-8 rounded-lg shadow-lg text-center animate__animated animate__fadeInRight">
              <p className="mb-4">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, elit at scelerisque egestas."</p>
              <p className="font-bold">Jane Smith</p>
              <p className="text-gray-600">COO</p>
            </div>
          </div>
        </div>
      </section>

      <section className="blog bg-gray-100 py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Recent Blog Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="blog-card bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Blog Post 1</h3>
              <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, elit at scelerisque egestas.</p>
              <a href="#" className="text-blue-500 hover:underline">Read More</a>
            </div>
            <div className="blog-card bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Blog Post 2</h3>
              <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, elit at scelerisque egestas.</p>
              <a href="#" className="text-blue-500 hover:underline">Read More</a>
            </div>
            <div className="blog-card bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Blog Post 3</h3>
              <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, elit at scelerisque egestas.</p>
              <a href="#" className="text-blue-500 hover:underline">Read More</a>
            </div>
          </div>
        </div>
      </section>

      <section className="faq bg-gray-200 py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="accordion">
            <div className="accordion-item">
              <h3 className="accordion-title">Question 1</h3>
              <div className="accordion-content">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, elit at scelerisque egestas.</p>
              </div>
            </div>
            <div className="accordion-item">
              <h3 className="accordion-title">Question 2</h3>
              <div className="accordion-content">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, elit at scelerisque egestas.</p>
              </div>
            </div>
            <div className="accordion-item">
              <h3 className="accordion-title">Question 3</h3>
              <div className="accordion-content">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, elit at scelerisque egestas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="team bg-gray-100 py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div className="team-card bg-white p-6 rounded-lg shadow-md text-center">
              <img src="team1.png" alt="Team Member 1" className="w-36 mx-auto mb-4 rounded-full" />
              <h3 className="text-xl font-bold">John Doe</h3>
              <p className="text-gray-600">CEO</p>
              <div className="social-links mt-4">
                <a href="#" className="text-blue-500 hover:text-blue-600 mx-1"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-blue-500 hover:text-blue-600 mx-1"><i className="fab fa-facebook"></i></a>
                <a href="#" className="text-blue-500 hover:text-blue-600 mx-1"><i className="fab fa-linkedin"></i></a>
              </div>
            </div>
            <div className="team-card bg-white p-6 rounded-lg shadow-md text-center">
              <img src="team2.png" alt="Team Member 2" className="w-36 mx-auto mb-4 rounded-full" />
              <h3 className="text-xl font-bold">Jane Smith</h3>
              <p className="text-gray-600">COO</p>
              <div className="social-links mt-4">
                <a href="#" className="text-blue-500 hover:text-blue-600 mx-1"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-blue-500 hover:text-blue-600 mx-1"><i className="fab fa-facebook"></i></a>
                <a href="#" className="text-blue-500 hover:text-blue-600 mx-1"><i className="fab fa-linkedin"></i></a>
              </div>
            </div>
            <div className="team-card bg-white p-6 rounded-lg shadow-md text-center">
              <img src="team3.png" alt="Team Member 3" className="w-36 mx-auto mb-4 rounded-full" />
              <h3 className="text-xl font-bold">Alex Johnson</h3>
              <p className="text-gray-600">CTO</p>
              <div className="social-links mt-4">
                <a href="#" className="text-blue-500 hover:text-blue-600 mx-1"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-blue-500 hover:text-blue-600 mx-1"><i className="fab fa-facebook"></i></a>
                <a href="#" className="text-blue-500 hover:text-blue-600 mx-1"><i className="fab fa-linkedin"></i></a>
              </div>
            </div>
            <div className="team-card bg-white p-6 rounded-lg shadow-md text-center">
              <img src="team4.png" alt="Team Member 4" className="w-36 mx-auto mb-4 rounded-full" />
              <h3 className="text-xl font-bold">Sarah Davis</h3>
              <p className="text-gray-600">Marketing Manager</p>
              <div className="social-links mt-4">
                <a href="#" className="text-blue-500 hover:text-blue-600 mx-1"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-blue-500 hover:text-blue-600 mx-1"><i className="fab fa-facebook"></i></a>
                <a href="#" className="text-blue-500 hover:text-blue-600 mx-1"><i className="fab fa-linkedin"></i></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="newsletter bg-gray-800 py-20 text-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Join Our Newsletter</h2>
          <p className="mb-4">Subscribe to get the latest updates and news straight to your inbox.</p>
          <form className="flex items-center">
            <input type="email" className="bg-white rounded-l-full px-6 py-3 focus:outline-none" placeholder="Enter your email address" />
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-r-full">Subscribe</button>
          </form>
        </div>
      </section>

      <section className="contact bg-gray-200 py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
          <form>
            <div className="mb-4">
              <label className="block">Name</label>
              <input type="text" id="name" className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
            </div>
            <div className="mb-4">
              <label className="block">Email</label>
              <input type="email" id="email" className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
            </div>
            <div className="mb-4">
              <label className="block">Message</label>
              <textarea id="message" className="w-full border-gray-300 rounded-md px-4 py-2 h-32 resize-none focus:outline-none focus:border-blue-500"></textarea>
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full">Send Message</button>
          </form>
        </div>
      </section>

      <section className="map py-20">
        <div className="container mx-auto">
          <div id="map"></div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-4 px-8">
        <div className="flex justify-between items-center">
          <div>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:text-gray-400"><i className="fab fa-facebook"></i></a></li>
              <li><a href="#" className="hover:text-gray-400"><i className="fab fa-twitter"></i></a></li>
              <li><a href="#" className="hover:text-gray-400"><i className="fab fa-linkedin"></i></a></li>
              <li><a href="#" className="hover:text-gray-400"><i className="fab fa-instagram"></i></a></li>
            </ul>
          </div>
          <p>&copy; 2022 List Creation SPA. All rights reserved.</p>
        </div>
      </footer>
    </>
  )

}
