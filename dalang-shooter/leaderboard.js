/**
 * Leaderboard — LocalStorage-backed leaderboard for Dalang Rhythm.
 *
 * Entry format:
 * {
 *   name:     string,   // player name
 *   score:    number,   // raw score
 *   accuracy: number,   // 0.0 – 100.0
 *   maxCombo: number,
 *   rank:     string,   // S / A / B / C / D
 *   songId:   string,
 *   songName: string,
 *   date:     string    // ISO date string
 * }
 *
 * Sorted by score descending. Top MAX_ENTRIES retained.
 */

const STORAGE_KEY  = 'dalangRhythm_leaderboard';
const MAX_ENTRIES  = 20;

export class Leaderboard {
  constructor() {
    this._entries = this._load();
  }

  /**
   * Save a new result entry. Automatically sorts and trims to MAX_ENTRIES.
   * @param {Object} entry
   * @returns {number} rank position (1-based) of the new entry
   */
  saveEntry(entry) {
    const safe = {
      name:     String(entry.name     ?? 'Player').trim().slice(0, 24) || 'Player',
      score:    Math.max(0, Math.round(entry.score   ?? 0)),
      accuracy: parseFloat((entry.accuracy ?? 0).toFixed(1)),
      maxCombo: Math.max(0, Math.round(entry.maxCombo ?? 0)),
      rank:     String(entry.rank     ?? 'D'),
      songId:   String(entry.songId   ?? ''),
      songName: String(entry.songName ?? ''),
      date:     new Date().toISOString()
    };

    this._entries.push(safe);
    this._sort();
    this._trim();
    this._save();

    // Return 1-based position
    return this._entries.findIndex(
      e => e.date === safe.date && e.score === safe.score
    ) + 1;
  }

  /**
   * Retrieve all entries sorted by score descending.
   * @returns {Array}
   */
  getAll() {
    return [...this._entries];
  }

  /**
   * Get top N entries.
   * @param {number} n
   * @returns {Array}
   */
  getTop(n = 10) {
    return this._entries.slice(0, n);
  }

  /**
   * Get entries filtered by songId.
   * @param {string} songId
   * @returns {Array}
   */
  getBySong(songId) {
    return this._entries.filter(e => e.songId === songId);
  }

  /**
   * Clear all leaderboard data.
   */
  clear() {
    this._entries = [];
    this._save();
  }

  /** @private */
  _sort() {
    this._entries.sort((a, b) => b.score - a.score);
  }

  /** @private */
  _trim() {
    if (this._entries.length > MAX_ENTRIES) {
      this._entries = this._entries.slice(0, MAX_ENTRIES);
    }
  }

  /** @private */
  _load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  /** @private */
  _save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._entries));
    } catch (e) {
      console.warn('[Leaderboard] Could not save to localStorage:', e);
    }
  }
}

/**
 * Compute rank letter from accuracy percentage.
 * @param {number} accuracy  - 0.0 to 100.0
 * @returns {string}  S | A | B | C | D
 */
export function computeRank(accuracy) {
  if (accuracy >= 95) return 'S';
  if (accuracy >= 80) return 'A';
  if (accuracy >= 65) return 'B';
  if (accuracy >= 50) return 'C';
  return 'D';
}

/**
 * Compute accuracy percentage from hit counts and total notes.
 * @param {{ perfect: number, great: number, good: number, miss: number }} hits
 * @param {number} totalNotes
 * @returns {number} 0.0 – 100.0
 */
export function computeAccuracy(hits, totalNotes) {
  if (!totalNotes) return 0;
  const maxPossible = totalNotes * 300;
  const earned = (hits.perfect * 300) + (hits.great * 100) + (hits.good * 50);
  return Math.min(100, (earned / maxPossible) * 100);
}
