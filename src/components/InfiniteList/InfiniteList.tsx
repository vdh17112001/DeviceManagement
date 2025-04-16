import React, { useReducer, useCallback, useRef } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { styles } from './styles';

interface Item {
  id: number;
  title: string;
}

interface State {
  items: Item[];
  isLoading: boolean;
  hasMore: boolean;
}

type Action =
  | { type: 'SET_ITEMS'; payload: Item[] }
  | { type: 'ADD_ITEMS'; payload: Item[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_HAS_MORE'; payload: boolean };

const initialState: State = {
  items: [],
  isLoading: false,
  hasMore: true,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    case 'ADD_ITEMS':
      return { ...state, items: [...state.items, ...action.payload] };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_HAS_MORE':
      return { ...state, hasMore: action.payload };
    default:
      return state;
  }
};

const _generateItems = (startIndex: number, count: number): Item[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: startIndex + index,
    title: `Item ${startIndex + index}`,
  }));
};

const InfiniteList: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const currentPage = useRef(0);
  const itemsPerPage = 10;

  const _loadInitialItems = useCallback(() => {
    const initialItems = _generateItems(0, 1000);
    dispatch({ type: 'SET_ITEMS', payload: initialItems });
  }, []);

  const _loadMoreItems = useCallback(() => {
    if (state.isLoading || !state.hasMore) return;

    dispatch({ type: 'SET_LOADING', payload: true });

    // Simulate API call delay
    setTimeout(() => {
      const newItems = _generateItems(
        currentPage.current * itemsPerPage,
        itemsPerPage
      );
      
      currentPage.current += 1;
      
      dispatch({ type: 'ADD_ITEMS', payload: newItems });
      dispatch({ type: 'SET_LOADING', payload: false });
      
      if (currentPage.current * itemsPerPage >= 1000) {
        dispatch({ type: 'SET_HAS_MORE', payload: false });
      }
    }, 1000);
  }, [state.isLoading, state.hasMore]);

  React.useEffect(() => {
    _loadInitialItems();
  }, [_loadInitialItems]);

  const _renderItem = useCallback(({ item }: { item: Item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.title}</Text>
    </View>
  ), []);

  const _renderFooter = useCallback(() => {
    if (!state.isLoading) return null;
    return (
      <View style={styles.footerContainer}>
        <ActivityIndicator size="small" />
      </View>
    );
  }, [state.isLoading]);

  return (
    <View style={styles.container}>
      <FlatList
        data={state.items}
        renderItem={_renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={_loadMoreItems}
        onEndReachedThreshold={0.5}
        ListFooterComponent={_renderFooter}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
      />
    </View>
  );
};

export default InfiniteList; 