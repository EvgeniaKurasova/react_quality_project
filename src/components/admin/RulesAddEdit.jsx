import React, { useState } from 'react'
import styles from './RulesAddEdit.module.css'

const RulesAddEdit = ({ rules = [], onSave, onCancel }) => {
  const [editingRules, setEditingRules] = useState(rules)
  const [newRule, setNewRule] = useState({ uk: '', en: '' })
  const [editingIndex, setEditingIndex] = useState(null)

  const handleAddRule = () => {
    if (newRule.uk.trim() || newRule.en.trim()) {
      setEditingRules([...editingRules, { ...newRule }])
      setNewRule({ uk: '', en: '' })
    }
  }

  const handleEditRule = (index) => {
    setEditingIndex(index)
  }

  const handleUpdateRule = (index, field, value) => {
    const updatedRules = [...editingRules]
    updatedRules[index] = {
      ...updatedRules[index],
      [field]: value,
    }
    setEditingRules(updatedRules)
  }

  const handleDeleteRule = (index) => {
    setEditingRules(editingRules.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    onSave(editingRules)
  }

  const renderRuleRow = (rule, index) => (
    <div className={styles.ruleRow} key={index}>
      <div className={styles.ruleContent}>
        <div className={styles.ruleField}>
          <label>Правило:</label>
          {editingIndex === index ? (
            <textarea
              value={rule.uk}
              onChange={(e) => handleUpdateRule(index, 'uk', e.target.value)}
              placeholder="Введіть правило українською"
            />
          ) : (
            <div className={styles.ruleText}>{rule.uk || 'Не вказано'}</div>
          )}
        </div>
        <div className={styles.ruleField}>
          <label>Rule:</label>
          {editingIndex === index ? (
            <textarea
              value={rule.en}
              onChange={(e) => handleUpdateRule(index, 'en', e.target.value)}
              placeholder="Enter rule in English"
            />
          ) : (
            <div className={styles.ruleText}>{rule.en || 'Not specified'}</div>
          )}
        </div>
      </div>
      <div className={styles.ruleActions}>
        {editingIndex === index ? (
          <button
            className={styles.saveButton}
            onClick={() => setEditingIndex(null)}
          >
            Зберегти
          </button>
        ) : (
          <button
            className={styles.editButton}
            onClick={() => handleEditRule(index)}
          >
            Редагувати
          </button>
        )}
        <button
          className={styles.deleteButton}
          onClick={() => handleDeleteRule(index)}
        >
          Видалити
        </button>
      </div>
    </div>
  )

  return (
    <div className={styles.rulesContainer}>
      <div className={styles.rulesList}>
        {editingRules.map((rule, index) => renderRuleRow(rule, index))}
      </div>

      <div className={styles.newRuleSection}>
        <h3>Додати нове правило</h3>
        <div className={styles.newRuleForm}>
          <div className={styles.ruleField}>
            <label>Правило:</label>
            <textarea
              value={newRule.uk}
              onChange={(e) => setNewRule({ ...newRule, uk: e.target.value })}
              placeholder="Введіть правило українською"
            />
          </div>
          <div className={styles.ruleField}>
            <label>Rule:</label>
            <textarea
              value={newRule.en}
              onChange={(e) => setNewRule({ ...newRule, en: e.target.value })}
              placeholder="Enter rule in English"
            />
          </div>
          <button className={styles.addButton} onClick={handleAddRule}>
            Додати правило
          </button>
        </div>
      </div>

      <div className={styles.actionButtons}>
        <button className={styles.cancelButton} onClick={onCancel}>
          Скасувати
        </button>
        <button className={styles.saveButton} onClick={handleSave}>
          Зберегти всі зміни
        </button>
      </div>
    </div>
  )
}

export default RulesAddEdit
