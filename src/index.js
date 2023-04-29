import "./css/styles.css";

const POSTS_API_URL =
  "https://jsonplaceholder.typicode.com/posts";
const POSTS_PER_PAGE = 10;

const postsContainer = document.querySelector(
  ".posts-container"
);
const paginationContainer = document.querySelector(
  ".pagination-container"
);

const getPosts = (page) => {
  let postListMarkup = "";
  const params = new URLSearchParams({
    _limit: POSTS_PER_PAGE,
    _page: page,
  });
  fetch(POSTS_API_URL + "?" + params)
    // without params:
    // `${POSTS_API_URL}?_limit=${POSTS_PER_PAGE}&_page=${page}`
    .then((response) => response.json())
    .then((posts) => {
      posts.forEach((post) => {
        postListMarkup += `
            <li>
                <h3>[${post.id}] ${post.title}</h3>
                <p>${post.body}</p>
            </li> 
        `;
      });
      // adding posts markup to DOM
      postsContainer.innerHTML = postListMarkup;
    });
};

const setPagination = () => {
  let paginationMarkup = "";
  for (let i = 1; i <= 10; i++) {
    paginationMarkup += `<button>${i}</button>`;
  }
  paginationContainer.innerHTML = paginationMarkup;

  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      pageNumber = event.target.textContent;
      getPosts(pageNumber);
    });
  });
};

getPosts(1);
setPagination();
