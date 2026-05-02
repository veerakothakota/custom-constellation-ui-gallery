// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import PegaExtensionsTwitterFeedWidget from './index';

export default {
  title: 'Widgets/Twitter Feed Widget',
  component: PegaExtensionsTwitterFeedWidget,
  argTypes: {
    getPConnect: {
      table: {
        disable: true
      }
    }
  }
} as Meta<typeof PegaExtensionsTwitterFeedWidget>;

declare const window: any;

const mockPCore = () => {
  window.PCore = {
    getRestClient: () => ({
      invokeRestApi: async () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              data: {
                data: [
                  {
                    id: "2050106917499121716",
                    public_metrics: { retweet_count: 12, reply_count: 5, like_count: 42, quote_count: 2 },
                    text: "Don’t take CPSSA unless you’re ready for leadership.\n\nThis isn’t a “next step” exam.\nIt’s a mindset shift 👇\nFrom coding ➝ Architecting\nFrom tasks ➝ Ownership\n\nThink you're ready?\n👉 https://t.co/P1UUi8U9JU\n\n#CPSSA #CPSSACertification #Pega #TechCareers",
                    created_at: "2026-05-01T06:55:52.000Z",
                    author_id: "720967250098790400"
                  },
                  {
                    id: "2050036630002577611",
                    public_metrics: { retweet_count: 3, reply_count: 2, like_count: 15, quote_count: 0 },
                    text: "Les compartimos los resultados del día jueves 30 de abril del 2026 de PEGA: La primera lotería electrónica de Lotería Nacional. \n\n#LoteríaNacional #Pega #Pega2 #Pega3 #Pega4 https://t.co/ujKJNLgUJC",
                    created_at: "2026-05-01T02:16:35.000Z",
                    author_id: "284148966"
                  },
                  {
                    id: "2049733017137238299",
                    public_metrics: { retweet_count: 8, reply_count: 4, like_count: 28, quote_count: 1 },
                    text: "Your customers expect personalization. Are you delivering it? 🤔\n\nPega Customer Decision Hub uses AI + real-time data to drive smarter interactions.\n\nRead more :\nhttps://t.co/ixChA5WtFi\n\n#enigmametaverse\n#CustomerExperience #AI #Pega #DigitalTransformation #MarTech",
                    created_at: "2026-04-30T06:10:08.000Z",
                    author_id: "1449032175366688782"
                  }
                ],
                includes: {
                  users: [
                    {
                      username: "ProcessExam",
                      name: "ProcessExam.com",
                      profile_image_url: "https://pbs.twimg.com/profile_images/847036987475398656/5yiJ-KLH_normal.jpg",
                      id: "720967250098790400"
                    },
                    {
                      username: "LoteriaNacJBG",
                      name: "Lotería Nacional EC",
                      profile_image_url: "https://pbs.twimg.com/profile_images/1895148194620653568/HD6AiOez_normal.jpg",
                      id: "284148966"
                    },
                    {
                      username: "EnigmaMetaverse",
                      name: "Enigma Metaverse",
                      profile_image_url: "https://pbs.twimg.com/profile_images/1557234876310425601/TB-fRpzg_normal.jpg",
                      id: "1449032175366688782"
                    }
                  ]
                }
              }
            });
          }, 800);
        });
      },
      getCancelTokenSource: () => ({
        token: {
          promise: new Promise(() => {})
        },
        cancel: () => {}
      }),
      isRequestCanceled: (error: any) => error?.isCanceled === true
    })
  };
};

type Story = StoryObj<typeof PegaExtensionsTwitterFeedWidget>;

export const Default: Story = {
  render: (args: any) => {
    mockPCore();
    const props = {
      ...args,
      getPConnect: () => {
        return {
          getActionsApi: () => ({
            updateFieldValue: () => {},
            triggerFieldChange: () => {}
          }),
          ignoreSuggestion: () => {},
          acceptSuggestion: () => {},
          setInheritedProps: () => {},
          resolveConfigProps: () => {}
        };
      }
    };
    return <PegaExtensionsTwitterFeedWidget {...(props as any)} />;
  },
  args: {
    heading: 'Latest Company News',
    dataPage: 'D_TwitterFeed',
    parameterName: 'query',
    parameterValue: '#Constellation'
  }
};
