// 从 localStorage 中获取评论数据
const storedComments = localStorage.getItem('comments');
const comments = storedComments ? JSON.parse(storedComments) : [];

// 渲染评论
function renderComments() {
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = '';
    comments.forEach((comment, index) => {
        const commentElement = document.createElement('div');
        commentElement.innerHTML = `<p><strong>${comment.author}:</strong> ${comment.text}</p>`;

        // 创建删除按钮
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '删除';
        deleteButton.classList.add('delete-comment');
        deleteButton.addEventListener('click', function () {
            // 删除评论
            comments.splice(index, 1);
            // 更新 localStorage
            localStorage.setItem('comments', JSON.stringify(comments));
            // 重新渲染评论
            renderComments();
        });

        const commentParagraph = commentElement.querySelector('p');
        commentParagraph.appendChild(deleteButton);

        commentsList.appendChild(commentElement);
    });
}

// 初始渲染评论
document.addEventListener('DOMContentLoaded', function () {
    renderComments();

    // 处理评论表单提交
    const commentForm = document.getElementById('comment-form');
    commentForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const author = document.getElementById('comment-author').value;
        const text = document.getElementById('comment-text').value;

        // 添加新评论
        comments.push({ author, text });
        // 更新 localStorage
        localStorage.setItem('comments', JSON.stringify(comments));

        // 重新渲染评论
        renderComments();

        // 清空表单
        document.getElementById('comment-author').value = '';
        document.getElementById('comment-text').value = '';
    });
});
