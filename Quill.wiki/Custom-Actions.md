# Custom Actions

Create your own AI actions tailored to your workflow.

---

## Creating a Custom Action

1. Open Thunderbird
2. Go to Menu ☰ → Add-ons → Quill → **Options**
3. Scroll to the **Actions** section
4. Click **"Add an action"**
5. Enter:
   - **Name**: Short name for the menu
   - **Prompt**: Instructions for the AI
6. Click **Save**

---

## Writing Good Prompts

### Be Specific

❌ **Bad**: "Make it better"

✅ **Good**: "Rewrite this text to be more concise while keeping all important information"

### Include Output Format

❌ **Bad**: "Summarize this"

✅ **Good**: "Summarize this email in 3 bullet points, each under 15 words"

### Provide Context

✅ **Good**: "You are reviewing a business email. Extract all action items and deadlines mentioned."

---

## Prompt Templates

### Professional Communication

```
Name: Make Professional
Prompt: Rewrite this text with a professional business tone. Keep the same meaning but use more formal language. Remove any casual expressions.
```

```
Name: Soften Tone
Prompt: Rewrite this text to be more diplomatic and less confrontational while maintaining the core message.
```

```
Name: Add Warmth
Prompt: Rewrite this text to sound warmer and more friendly while remaining professional.
```

### Productivity

```
Name: Extract Action Items
Prompt: Identify all action items, tasks, and deadlines mentioned in this email. List them as a numbered checklist.
```

```
Name: Key Points
Prompt: Extract the 3-5 most important points from this email. Present each as a single sentence.
```

```
Name: Quick Summary
Prompt: Summarize this email in one sentence (under 25 words).
```

### Writing Assistance

```
Name: Simplify
Prompt: Rewrite this text using simpler words and shorter sentences. Target a reading level suitable for non-native English speakers.
```

```
Name: Expand
Prompt: Expand this brief text into a more detailed version. Add relevant details and explanations while maintaining the original tone.
```

```
Name: Fix Grammar Only
Prompt: Correct only spelling and grammar errors. Do not change the style, tone, or meaning.
```

### Response Generation

```
Name: Polite Decline
Prompt: Generate a polite response declining the request in this email. Express appreciation and leave the door open for future opportunities.
```

```
Name: Request More Info
Prompt: Generate a professional response asking for clarification on the unclear points in this email.
```

```
Name: Confirm Receipt
Prompt: Generate a brief, professional response acknowledging receipt of this email and confirming you will follow up soon.
```

### Multilingual

```
Name: Translate + Polish FR
Prompt: Translate this to French and ensure the translation sounds natural to a native French speaker.
```

```
Name: Translate + Polish DE
Prompt: Translate this to German and ensure the translation sounds natural to a native German speaker.
```

### Analysis

```
Name: Sentiment Analysis
Prompt: Analyze the emotional tone of this email. Rate: Positive/Neutral/Negative. Identify specific phrases that indicate the sender's mood.
```

```
Name: Urgency Check
Prompt: Assess the urgency level of this email (Low/Medium/High/Critical). Explain what indicates the urgency level.
```

---

## Tips for Better Results

### Use Variables Mentally

Think of `{email}` as the selected text:
- "Translate {email} to Spanish"
- "Summarize {email} in bullet points"

### Test with Examples

Try your new action on different emails to ensure it works well in various contexts.

### Keep It Focused

One action = one task. Create multiple simple actions rather than one complex one.

### Iterate

If results aren't quite right, adjust your prompt and try again.

---

## Managing Actions

### Edit an Action
1. Go to Quill settings
2. Find the action
3. Modify name or prompt
4. Save

### Delete an Action
1. Go to Quill settings
2. Click **"Delete"** next to the action

### Reset to Defaults
1. Go to Quill settings
2. Click **"Reset"** to restore original actions

⚠️ **Warning**: Reset removes all custom actions!

---

## See Also

- [[Basic-Usage]] - How to use actions
- [[Chat-Feature]] - Conversational AI
