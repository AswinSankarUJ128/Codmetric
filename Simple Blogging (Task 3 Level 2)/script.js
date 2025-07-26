const form = document.getElementById('blogForm');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const blogPostsContainer = document.getElementById('blogPosts');

document.addEventListener('DOMContentLoaded', displayBlogs);

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (title && content) {
    const blog = {
      id: Date.now(),
      title,
      content,
      timestamp: new Date().toISOString()
    };

    saveBlog(blog);
    titleInput.value = '';
    contentInput.value = '';
    displayBlogs();
  }
});

function saveBlog(blog) {
  const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
  blogs.unshift(blog); // Add to top
  localStorage.setItem('blogs', JSON.stringify(blogs));
}

function deleteBlog(id) {
  const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
  const updatedBlogs = blogs.filter(blog => blog.id !== id);
  localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
  displayBlogs();
}

function displayBlogs() {
  const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
  blogPostsContainer.innerHTML = blogs.map(blog => `
    <div class="blog-post">
      <button class="delete-btn" onclick="deleteBlog(${blog.id})">Delete</button>
      <h3>${blog.title}</h3>
      <p>${blog.content}</p>
    </div>
  `).join('');
}
