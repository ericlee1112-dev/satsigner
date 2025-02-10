import { router } from 'expo-router'
import { useEffect, useState } from 'react'

import SSHStack from '@/layouts/SSHStack'
import SSVStack from '@/layouts/SSVStack'
import { t } from '@/locales'
import { Colors } from '@/styles'
import { formatLabel } from '@/utils/format'

import { SSIconEditPencil } from './icons'
import SSButton from './SSButton'
import SSIconButton from './SSIconButton'
import SSText from './SSText'

type SSLabelDetailsProps = {
  label: string
  link: string
  header: string
}

export default function SSLabelDetails({
  label: originalLabel,
  link,
  header
}: SSLabelDetailsProps) {
  const [label, setLabel] = useState('')
  const [tags, setTags] = useState<string[]>([])

  useEffect(() => {
    const { label, tags } = formatLabel(originalLabel)
    setLabel(label)
    setTags(tags)
  }, [originalLabel])

  return (
    <SSHStack justifyBetween style={{ alignItems: 'flex-start' }}>
      <SSVStack gap="sm">
        <SSText uppercase size="md" weight="bold">
          {header}
        </SSText>
        {label && <SSText>{label}</SSText>}
        {tags.length > 0 && (
          <SSHStack gap="sm">
            {tags.map((tag) => (
              <SSButton
                key={tag}
                label={tag}
                uppercase={false}
                style={{
                  backgroundColor: Colors.gray[700],
                  borderStyle: 'solid',
                  paddingHorizontal: 8,
                  height: 'auto',
                  width: 'auto'
                }}
              />
            ))}
          </SSHStack>
        )}
        {!label && <SSText color="muted">{t('account.noLabel')}</SSText>}
        {tags.length === 0 && (
          <SSText color="muted">{t('account.noTags')}</SSText>
        )}
      </SSVStack>
      <SSIconButton onPress={() => router.navigate(link)}>
        <SSIconEditPencil height={20} width={20} />
      </SSIconButton>
    </SSHStack>
  )
}
