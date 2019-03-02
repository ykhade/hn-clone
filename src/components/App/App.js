import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import Nav from 'components/Nav';
import List from 'components/List';
import Grid from 'components/Grid';
import Loader from 'components/Loader';
import { layouts, themes } from 'store/app/utils';
import { colorsDark, colorsLight } from 'styles/palette';

import { Wrapper, Title, TitleWrapper, GithubLink, SocialLink } from './styles';

class App extends Component {
  static defaultProps = {
    stories: [],
  };

  static propTypes = {
    layout: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired,
    stories: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    storyIds: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasMoreStores: PropTypes.bool.isRequired,
    fetchStories: PropTypes.func.isRequired,
    fetchStoriesFirstPage: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchStoriesFirstPage();
    this.setBodyBackgroundColor();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.theme !== this.props.theme) {
      this.setBodyBackgroundColor();
    }
  }

  setBodyBackgroundColor() {
    if (this.props.theme === themes.light) {
      document.body.style = `background-color: ${colorsLight.background};`;
    } else {
      document.body.style = `background-color: ${colorsDark.background};`;
    }
  }

  fetchStories = () => {
    const { storyIds, page, fetchStories, isFetching } = this.props;
    if (!isFetching) {
      fetchStories({ storyIds, page });
    }
  };

  render() {
    const { stories, layout, theme, hasMoreStores } = this.props;
    return (
      <ThemeProvider theme={theme === themes.light ? colorsLight : colorsDark}>
        <div>
          <Nav />
          <Wrapper>
            <TitleWrapper>
              <Title>
                <div>{'// Hacker News Clone'}</div>

              </Title>

            </TitleWrapper>
            <InfiniteScroll
              dataLength={stories.length}
              next={this.fetchStories}
              hasMore={hasMoreStores}
              loader={<Loader />}
              style={{
                height: '100%',
                overflow: 'visible',
              }}
            >
              {layout === layouts.list ? <List stories={stories} /> : <Grid stories={stories} />}
            </InfiniteScroll>
          </Wrapper>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
