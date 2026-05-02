import { useEffect, useState, useCallback } from 'react';
import { Progress, withConfiguration } from '@pega/cosmos-react-core';
import type { PConnFieldProps } from '../shared/PConnProps';
import '../shared/create-nonce';

import StyledWrapper from './styles';

interface PegaExtensionsTwitterFeedWidgetProps extends PConnFieldProps {
  heading?: string;
  parameterName: string;
  parameterValue: string;
  dataPage: string;
}

const VerifiedIcon = () => (
  <svg className="verified" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.5 12.5c0-1.58-.88-2.95-2.18-3.66.15-.44.23-.91.23-1.4 0-2.32-1.88-4.2-4.2-4.2-.49 0-.96.08-1.4.23C14.25 2.18 12.88 1.3 11.3 1.3c-1.58 0-2.95.88-3.66 2.18-.44-.15-.91-.23-1.4-.23-2.32 0-4.2 1.88-4.2 4.2 0 .49.08.96.23 1.4C1.02 9.55.13 10.92.13 12.5c0 1.58.88 2.95 2.18 3.66-.15.44-.23.91-.23 1.4 0 2.32 1.88 4.2 4.2 4.2.49 0 .96-.08 1.4-.23 1.21 1.3 2.58 2.18 4.16 2.18 1.58 0 2.95-.88 3.66-2.18.44.15.91.23 1.4.23 2.32 0 4.2-1.88 4.2-4.2 0-.49-.08-.96-.23-1.4 1.3-1.21 2.18-2.58 2.18-4.16zM11.3 17.1l-3.8-3.8 1.4-1.4 2.4 2.4 5.3-5.3 1.4 1.4-6.7 6.7z" />
  </svg>
);

const formatText = (text: string) => {
  if (!text) return '';
  
  // Regex to match URLs, hashtags, and mentions
  const regex = /(https?:\/\/[^\s]+|#\w+|@\w+)/g;
  const parts = text.split(regex);
  
  return parts.map((part, i) => {
    if (part.startsWith('http')) {
      // eslint-disable-next-line react/no-array-index-key
      return <a key={`url-${i}`} href={part} target="_blank" rel="noopener noreferrer" className="highlight">{part}</a>;
    }
    if (part.startsWith('#')) {
      const tag = part.substring(1);
      // eslint-disable-next-line react/no-array-index-key
      return <a key={`tag-${i}`} href={`https://twitter.com/hashtag/${tag}`} target="_blank" rel="noopener noreferrer" className="highlight">{part}</a>;
    }
    if (part.startsWith('@')) {
      const user = part.substring(1);
      // eslint-disable-next-line react/no-array-index-key
      return <a key={`user-${i}`} href={`https://twitter.com/${user}`} target="_blank" rel="noopener noreferrer" className="highlight">{part}</a>;
    }
    return part;
  });
};

function PegaExtensionsTwitterFeedWidget(props: PegaExtensionsTwitterFeedWidgetProps) {
  const { heading = "Twitter Feed", parameterName = "query", parameterValue = "", dataPage = "", getPConnect } = props;
  const [tweets, setTweets] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);

  const fetchTwitterData = useCallback(async () => {
    const PCore = (window as any).PCore;
    
    // For Storybook/Local Preview: Load mock data if PCore is missing
    if (!PCore || !PCore.getDataPageUtils) {
      console.log("PCore not found, loading mock data for preview...");
      // cspell:disable
      const mockTweets = [
        {
          id: "2050106917499121716",
          Text: "Don’t take CPSSA unless you’re ready for leadership.\n\nThis isn’t a “next step” exam.\nIt’s a mindset shift 👇\nFrom coding ➝ Architecting\nFrom tasks ➝ Ownership\n\nThink you're ready?\n👉 https://www.patreon.com/posts/dont-take-cpssa-156651917\n\n#CPSSA #CPSSACertification #Pega #TechCareers",
          AuthorName: "ProcessExam.com",
          Handle: "@ProcessExam",
          AvatarURL: "https://pbs.twimg.com/profile_images/847036987475398656/5yiJ-KLH_normal.jpg",
          Timestamp: "May 1, 2026, 6:55 AM",
          Replies: 5,
          Retweets: 12,
          Likes: 42,
          isVerified: true
        },
        {
          id: "2050036630002577611",
          Text: "Les compartimos los resultados del día jueves 30 de abril del 2026 de PEGA: La primera lotería electrónica de Lotería Nacional. \n\n#LoteríaNacional #Pega #Pega2 #Pega3 #Pega4",
          AuthorName: "Lotería Nacional EC",
          Handle: "@LoteriaNacJBG",
          AvatarURL: "https://pbs.twimg.com/profile_images/1895148194620653568/HD6AiOez_normal.jpg",
          Timestamp: "May 1, 2026, 2:16 AM",
          Replies: 2,
          Retweets: 3,
          Likes: 15,
          isVerified: false
        },
        {
          id: "2049733017137238299",
          Text: "Your customers expect personalization. Are you delivering it? 🤔\n\nPega Customer Decision Hub uses AI + real-time data to drive smarter interactions.\n\nRead more :\nhttps://enigmametaverse.com/pega-customer-decision-hub-overview/\n\n#enigmametaverse\n#CustomerExperience #AI #Pega #DigitalTransformation #MarTech",
          AuthorName: "Enigma Metaverse",
          Handle: "@EnigmaMetaverse",
          AvatarURL: "https://pbs.twimg.com/profile_images/1557234876310425601/TB-fRpzg_normal.jpg",
          Timestamp: "Apr 30, 2026, 6:10 AM",
          Replies: 4,
          Retweets: 8,
          Likes: 28,
          isVerified: false
        }
      ];
      // cspell:enable
      setTweets(mockTweets);
      setLoading(false);
      return;
    }

    if (!dataPage) {
      setError("Please configure the Twitter Data Page.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await PCore.getDataPageUtils().getPageDataAsync(dataPage, getPConnect().getContextName(), { [parameterName]: parameterValue });
      
      const responseData = response?.pxResults || response?.data?.pxResults || response?.data || response;
      const tweetsList = Array.isArray(responseData) ? responseData : (responseData?.data || []);
      const includes = response?.includes || responseData?.includes || {};
      const users = includes.users || [];

      const messageList = tweetsList.map((tweet: any) => {
        const author = users.find((u: any) => u.id === tweet.author_id) || {};
        
        return {
          pyID: tweet.id || Math.random().toString(),
          Text: tweet.text || "",
          AuthorName: author.name || "Twitter User",
          Handle: author.username ? `@${author.username}` : `@user_${tweet.author_id || 'unknown'}`,
          AvatarURL: author.profile_image_url || "",
          Timestamp: tweet.created_at 
            ? new Date(tweet.created_at).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) 
            : "Recently",
          Replies: tweet.public_metrics?.reply_count || 0,
          Retweets: tweet.public_metrics?.retweet_count || 0,
          Likes: tweet.public_metrics?.like_count || 0,
          isVerified: author.verified || false
        };
      });

      setTweets(messageList);
    } catch (err: any) {
      const detail = err?.response?.data?.errorDetails?.[0]?.localizedValue || "";
      setError(`Unable to load the Twitter feed. ${detail}`);
    } finally {
      setLoading(false);
    }
  }, [parameterName, parameterValue, dataPage, getPConnect]);

  useEffect(() => {
    fetchTwitterData();
  }, [fetchTwitterData]);

  if (loading && tweets.length === 0) {
    return (
      <StyledWrapper>
        <Progress placement="inline" message="Loading Twitter Feed..." />
      </StyledWrapper>
    );
  }

  if (error && tweets.length === 0) {
    return (
      <StyledWrapper>
        <div className="status-msg" style={{ color: '#ff4d4f' }}>{error}</div>
      </StyledWrapper>
    );
  }

  return (
    <StyledWrapper>
      <div className="feed-header">
        <div className="title-group">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
          </svg>
          {heading || 'Twitter Feed'}
        </div>
        <button type="button" className="refresh-btn" onClick={fetchTwitterData} title="Refresh Feed" disabled={loading}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={loading ? 'spinning' : ''}>
            <path d="M23 4v6h-6"></path>
            <path d="M1 20v-6h6"></path>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
          </svg>
        </button>
      </div>
      
      {tweets.length === 0 && !loading ? (
        <div className="status-msg">No activity found.</div>
      ) : (
        <>
          {tweets.slice(0, visibleCount).map((tweet, index) => (
            <div key={tweet.id || index} className="tweet-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="avatar-header">
                <div className="avatar">
                  <img 
                    src={tweet.AvatarURL || `https://ui-avatars.com/api/?name=${tweet.AuthorName || 'U'}&background=random&color=fff`} 
                    alt="avatar" 
                  />
                </div>
                <div className="header-info">
                  <span className="name">
                    {tweet.AuthorName} {tweet.isVerified && <VerifiedIcon />}
                  </span>
                  <span className="handle">{tweet.Handle}</span>
                </div>
              </div>
              <div className="content">
                <div className="time-stamp">{tweet.Timestamp}</div>
                <div className="text">{formatText(tweet.Text)}</div>
                <div className="actions">
                  <div className="action-item reply" aria-label={`Reply to tweet by ${tweet.AuthorName}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    {tweet.Replies || 0}
                  </div>
                  <div className="action-item retweet" aria-label={`Retweet post by ${tweet.AuthorName}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 1l4 4-4 4m-11 0l-4-4 4-4m-4 10h14a2 2 0 0 1 2 2v3m-18-3v-3a2 2 0 0 1 2-2h14"></path>
                    </svg>
                    {tweet.Retweets || 0}
                  </div>
                  <div className="action-item like" aria-label={`Like post by ${tweet.AuthorName}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    {tweet.Likes || 0}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {visibleCount < tweets.length && (
            <button type="button" className="load-more" onClick={() => setVisibleCount(prev => prev + 3)}>
              Load More
            </button>
          )}
        </>
      )}
    </StyledWrapper>
  );
}

export default withConfiguration(PegaExtensionsTwitterFeedWidget);

