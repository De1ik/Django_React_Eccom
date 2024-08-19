<h2>Features</h1>
<h3> User Features:</h3>
<ul>
<li><strong>User Registration & Authentication:</strong> Secure user registration with JWT tokens. Includes email verification for account activation and password reset functionality.</li>
<li><strong>Product Search & Filters:</strong> Powerful search functionality that allows users to find products by name, ID, and more. Additionally, products can be filtered based on various criteria.</li>
<li><strong>Order Process:</strong> A complete order process has been implemented, guiding the user from product selection to order confirmation. (Note: Payment module is currently disabled.)</li>
</ul>

<h3>Admin Panel:</h3>
<ul>
<li><strong>User Management:</strong> View, edit, and manage user accounts directly from the admin panel.</li>
<li><strong>Order Management:</strong> Track and update orders efficiently, ensuring smooth order fulfillment.</li>
<li><strong>Product Management:</strong> Easily add new products, as well as edit and manage existing ones.</li>
</ul>

<h2>Technologies Used</h2>
<ul>
<li><strong>Frontend:</strong> React</li>
<li><strong>Backend:</strong> Django</li>
<li><strong>Database:</strong> PostgreSQL and pictures are on the AWS bucket</li>
<li><strong>State Management:</strong> Redux</li>
</ul>

<h2>Getting Started</h2>
<h3>Prerequisites</h3>
<p>Before you begin, ensure you have the following installed:</p>
<ul>
<li>Node.js</li>
<li>Python</li>
<li>PostgreSQL</li>
</ul>

<h3>Installation</h3>
<ol>
  <li>Clone the repository:
    <p></p>
    <pre><code>git clone https://github.com/your-username/your-repo-name.git</code></pre>
    <pre><code>cd your-repo-name</code></pre>
  </li>
  
  <li>Backend Setup:
    <p></p>
    <ul>
      <li>
        Navigate to the backend directory:
        <pre><code>cd backend</code></pre>
      </li>
      <li>
        Install dependencies:
        <pre><code>pip install -r requirements.txt</code></pre>
      </li>
      <li>
        Set up the database (in development mode - when debug == True, it uses sqlite to easier instalattion):
        <pre><code>python manage.py migrate</code></pre>
      </li>
      <li>
        In the file <strong>seetting.py</strong> Change the required variable (like EMAIL_HOST_USER or AWS_ACCESS_KEY_ID) to yourself for correct work
      </li>
      <li>
        Run the development server:
        <pre><code>python manage.py runserver</code></pre>
      </li>
    </ul>
  </li>

  <li>Frontend Setup:
    <p></p>
    <ul>
      <li>
        From the root folder navigate to the frontend directory:
        <pre><code>cd frontend</code></pre>
      </li>
      <li>
        Install dependencies:
        <pre><code>npm install</code></pre>
      </li>
      <li>
        Start the development server:
        <pre><code>npm run dev</code></pre>
      </li>
    </ul>
  </li>
</ol>

<h3>Usage</h3>
<ul>
  <li>Access the frontend at http://147.175.161.115:5173/</li>
  <li>Access the backend admin panel at http://127.0.0.1:8000/admin/</li>
</ul>
