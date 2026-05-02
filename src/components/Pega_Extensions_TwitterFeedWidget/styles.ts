import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export default styled.div(() => {
  return css`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0;
    background: transparent;
    border: none;
    box-shadow: none;
    width: 100%;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Inter', -apple-system, sans-serif;

    .feed-header {
      font-size: 0.9rem;
      font-weight: 900;
      color: #0f1419;
      margin-bottom: 0.25rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 4px;
      
      .title-group {
        display: flex;
        align-items: center;
        gap: 0.35rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        min-width: 0;
        
        svg {
          color: #1da1f2;
          width: 16px;
          height: 16px;
          flex-shrink: 0;
        }
      }

      .refresh-btn {
        background: #f7f9f9;
        border: 1px solid #eff3f4;
        color: #0f1419;
        cursor: pointer;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

        &:hover:not(:disabled) {
          background-color: #1da1f2;
          color: white;
          transform: rotate(180deg);
          box-shadow: 0 4px 12px rgba(29, 161, 242, 0.3);
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .spinning {
          animation: spin 1s linear infinite;
        }
      }
    }

    .tweet-card {
      background: white;
      border: 1px solid #eff3f4;
      border-radius: 8px;
      padding: 4px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 0.25rem;
      animation: ${fadeIn} 0.5s cubic-bezier(0.4, 0, 0.2, 1) backwards;

      &:hover {
        border-color: #1da1f2;
      }
    }

    .avatar-header {
      display: flex;
      align-items: center;
      gap: 6px;
      overflow: hidden;
      min-width: 0;
    }

    .avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #f0f3f5;
      flex-shrink: 0;
      overflow: hidden;
      border: 1px solid #e1e8ed;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .header-info {
      display: flex;
      flex-direction: column;
      line-height: 1.1;
      overflow: hidden;
      min-width: 0;

      .name {
        font-weight: 800;
        color: #0f1419;
        font-size: 0.75rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .handle {
        color: #536471;
        font-size: 0.7rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }

    .time-stamp {
      font-size: 0.7rem;
      color: #536471;
      font-weight: 400;
      margin-bottom: 0.15rem;
    }

    .text {
      color: #0f1419;
      line-height: 1.4;
      font-size: 0.85rem;
      word-break: break-word;

      .highlight {
        color: #1da1f2;
        text-decoration: none;
        font-weight: 500;
        font-size: 0.8rem;
        transition: color 0.2s;
        &:hover { color: #1a8cd8; }
      }
    }

    .actions {
      display: flex;
      justify-content: flex-start;
      gap: 1.5rem;
      margin-top: 0.5rem;
      padding-top: 0.75rem;
      border-top: 1px dashed #eff3f4;

      .action-item {
        display: flex;
        align-items: center;
        gap: 0.45rem;
        font-size: 0.85rem;
        font-weight: 500;
        color: #536471;
        cursor: pointer;
        transition: all 0.2s;

        svg {
          width: 18px;
          height: 18px;
          transition: transform 0.2s;
        }

        &:hover {
          &.reply { color: #1da1f2; svg { transform: scale(1.1); } }
          &.retweet { color: #00ba7c; svg { transform: scale(1.1); } }
          &.like { color: #f91880; svg { transform: scale(1.2); } }
        }
      }
    }

    .load-more {
      align-self: center;
      margin-top: 0.5rem;
      background: linear-gradient(135deg, #1da1f2, #1a8cd8);
      border: none;
      color: white;
      padding: 0.5rem 1.25rem;
      border-radius: 20px;
      cursor: pointer;
      font-weight: 700;
      font-size: 0.85rem;
      box-shadow: 0 4px 15px rgba(29, 161, 242, 0.3);
      transition: all 0.3s;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(29, 161, 242, 0.4);
      }

      &:active {
        transform: translateY(0);
      }
    }

    .status-msg {
      padding: 2.5rem;
      text-align: center;
      color: #536471;
      font-size: 1rem;
      font-style: italic;
    }
  `;
});
