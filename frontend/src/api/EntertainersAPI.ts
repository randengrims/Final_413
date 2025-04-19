import { Entertainer } from '../types/Entertainer';
import { EntertainerSummary } from '../types/EntertainerSummary';

interface FetchEntertainersResponse {
  entertainers: Entertainer[];
  totalNumEntertainers: number;
}

const API_URL = 'https://localhost:5000/Entertainment';

// Fetch summaries with booking count and last booking date
export const fetchEntertainerSummaries = async (): Promise<
  EntertainerSummary[]
> => {
  try {
    const response = await fetch(`${API_URL}/EntertainerSummaries`);
    if (!response.ok) {
      throw new Error('Failed to fetch entertainer summaries');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching entertainer summaries:', error);
    throw error;
  }
};

// Full fetch w/ pagination + filters
export const fetchEntertainers = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[]
): Promise<FetchEntertainersResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `EntertainerTypes=${encodeURIComponent(cat)}`)
      .join('&');

    const response = await fetch(
      `${API_URL}/AllEntertainers?pageSize=${pageSize}&pageNum=${pageNum}${
        selectedCategories.length ? `&${categoryParams}` : ''
      }`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch the entertainers');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching the entertainers:', error);
    throw error;
  }
};

export const addEntertainer = async (
  newEntertainer: Entertainer
): Promise<Entertainer> => {
  try {
    const response = await fetch(`${API_URL}/AddEntertainer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEntertainer),
    });

    if (!response.ok) {
      throw new Error('Failed to add the entertainer');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding the entertainer', error);
    throw error;
  }
};

export const updateEntertainer = async (
  entertainerID: number,
  updatedEntertainer: Entertainer
): Promise<Entertainer> => {
  try {
    const response = await fetch(
      `${API_URL}/UpdateEntertainer/${entertainerID}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEntertainer),
      }
    );

    return await response.json();
  } catch (error) {
    console.error('Error updating the entertainer:', error);
    throw error;
  }
};

export const deleteEntertainer = async (
  entertainerID: number
): Promise<void> => {
  try {
    const response = await fetch(
      `${API_URL}/DeleteEntertainer/${entertainerID}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to delete the entertainer');
    }
  } catch (error) {
    console.error('Error deleting the entertainer:', error);
    throw error;
  }
};