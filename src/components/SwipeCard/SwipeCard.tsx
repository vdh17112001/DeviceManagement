import React, { useRef, useReducer } from 'react';
import {
  View,
  Text,
  PanResponder,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { styles } from './styles';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

interface CardData {
  id: number;
  title: string;
  description: string;
}

const mockData: CardData[] = [
  {
    id: 1,
    title: 'Card 1',
    description: 'This is the first card description',
  },
  {
    id: 2,
    title: 'Card 2',
    description: 'This is the second card description',
  },
  {
    id: 3,
    title: 'Card 3',
    description: 'This is the third card description',
  },
];

interface State {
  cards: CardData[];
  currentIndex: number;
}

type Action = { type: 'SWIPE_CARD' };

const initialState: State = {
  cards: mockData,
  currentIndex: 0,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SWIPE_CARD':
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
      };
    default:
      return state;
  }
};

export const SwipeCard = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const position = useRef(new Animated.ValueXY()).current;

  const _resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const _onSwipeComplete = (direction: 'left' | 'right') => {
    const { currentIndex, cards } = state;
    const item = cards[currentIndex];

    if (currentIndex >= cards.length) {
      return;
    }

    dispatch({ type: 'SWIPE_CARD' });
    position.setValue({ x: 0, y: 0 });
  };

  const _forceSwipe = (direction: 'left' | 'right') => {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => _onSwipeComplete(direction));
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          _forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          _forceSwipe('left');
        } else {
          _resetPosition();
        }
      },
    })
  ).current;

  const _renderCard = () => {
    const { currentIndex, cards } = state;

    if (currentIndex >= cards.length) {
      return (
        <View style={styles.noMoreCards}>
          <Text>No more cards</Text>
        </View>
      );
    }

    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg'],
    });

    const cardStyle = {
      ...position.getLayout(),
      transform: [{ rotate }],
    };

    return (
      <Animated.View
        style={[styles.card, cardStyle]}
        {...panResponder.panHandlers}
      >
        <Text style={styles.title}>{cards[currentIndex].title}</Text>
        <Text style={styles.description}>
          {cards[currentIndex].description}
        </Text>
      </Animated.View>
    );
  };

  return <View style={styles.container}>{_renderCard()}</View>;
}; 